const contentSections = [
  { id: 1, title: '雷速体育频道', tags: ['足球', '篮球', '网球'], url: 'https://prorayspeed.com/sports' },
  { id: 2, title: '雷速新闻中心', tags: ['转会', '赛程', '比分'], url: 'https://prorayspeed.com/news' },
  { id: 3, title: '雷速直播大厅', tags: ['直播', '回放', '集锦'], url: 'https://prorayspeed.com/live' },
  { id: 4, title: '雷速数据统计', tags: ['排名', '射手榜', '助攻榜'], url: 'https://prorayspeed.com/stats' },
  { id: 5, title: '雷速社区互动', tags: ['讨论', '预测', '投票'], url: 'https://prorayspeed.com/community' }
];

const keywordMapping = {
  '雷速': { priority: 1, relatedSections: [1, 2, 3, 4, 5] },
  '足球': { priority: 2, relatedSections: [1, 3, 4] },
  '篮球': { priority: 2, relatedSections: [1, 3, 4] },
  '直播': { priority: 3, relatedSections: [3] },
  '比分': { priority: 3, relatedSections: [2, 4] },
  '赛程': { priority: 3, relatedSections: [2] },
  '转会': { priority: 4, relatedSections: [2] },
  '排名': { priority: 4, relatedSections: [4] },
  '讨论': { priority: 5, relatedSections: [5] }
};

function filterSectionsByKeyword(query) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const matchedKeywords = Object.keys(keywordMapping).filter(keyword =>
    keyword.toLowerCase().includes(lowerQuery) || lowerQuery.includes(keyword.toLowerCase())
  );

  if (matchedKeywords.length === 0) return [];

  const matchedIds = new Set();
  matchedKeywords.forEach(kw => {
    const ids = keywordMapping[kw].relatedSections || [];
    ids.forEach(id => matchedIds.add(id));
  });

  const result = contentSections.filter(section => matchedIds.has(section.id));
  return result.sort((a, b) => a.id - b.id);
}

function displaySearchResults(query) {
  const results = filterSectionsByKeyword(query);
  const outputDiv = document.getElementById('searchOutput');
  if (!outputDiv) return;

  outputDiv.innerHTML = '';

  if (results.length === 0) {
    outputDiv.textContent = '未找到相关内容';
    return;
  }

  const list = document.createElement('ul');
  results.forEach(section => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = section.url;
    link.textContent = section.title;
    link.target = '_blank';
    item.appendChild(link);
    const tagSpan = document.createElement('span');
    tagSpan.textContent = ' [' + section.tags.join(', ') + ']';
    item.appendChild(tagSpan);
    list.appendChild(item);
  });
  outputDiv.appendChild(list);
}

function initSearchWidget() {
  const searchBox = document.getElementById('searchBox');
  if (searchBox) {
    searchBox.addEventListener('input', function() {
      displaySearchResults(this.value);
    });
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initSearchWidget);
}

export { contentSections, keywordMapping, filterSectionsByKeyword, displaySearchResults, initSearchWidget };