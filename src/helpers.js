function toKebabCase(str) {
  if (!str) {
    return "";
  }

  const matched = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  );
  if (matched) {
    return matched.map(x => x.toLowerCase()).join("-");
  }
  return str;
}

function hoistParents(headers) {
  if (headers.length === 1 && headers[0].children) {
    return hoistParents(headers[0].children);
  }
  return headers;
}

function getTypes(sources) {
  const types = new Set();
  const numberOfTypes = {};

  sources.map(s => {
    const data = s.data;
    if (data && data.frontmatter) {
      const { title, type } = data.frontmatter;
      const t = type ? type : title;

      if (numberOfTypes[t]) {
        numberOfTypes[type]++;
      } else {
        numberOfTypes[t] = 1;
      }
      types.add(t);
    }
  });
  return [Array.from(types), numberOfTypes];
}

export const postProcessingHeaders = (sources, headers) => {
  if (!sources.length) {
    return hoistParents(headers);
  }

  if (headers.length === 1 && !headers[0].children) {
    return [];
  }

  const [types, numberOfTypes] = getTypes(sources);
  if (!types.length) {
    return headers;
  }
  const processedHeaders = [];

  for (const type of types) {
    if (numberOfTypes[type] === 1 && headers.find(h => h.title === type)) {
      continue;
    }

    processedHeaders.push({
      title: type,
      id: toKebabCase(`${type}-${type}`),
      level: "doc-type",
      children: []
    });
  }

  if (!processedHeaders.length) {
    return hoistParents(headers);
  }

  headers.map(h => {
    const data = h.source && h.source.data;
    if (data && data.frontmatter) {
      const { title, type } = data.frontmatter;
      const t = type ? type : title;

      const ph = processedHeaders.find(p => p.title === t);
      if (ph && ph.children) {
        h.parent = ph;
        ph.children.push(h);
      } else {
        processedHeaders.push(h);
      }
    }
  });

  const sortedProcessedHeaders = [];
  for (const type of types) {
    const newHeaders = processedHeaders.find(h => h.title === type);
    if (newHeaders) {
      sortedProcessedHeaders.push(newHeaders);
    }
  }

  return hoistParents(sortedProcessedHeaders);
};
