/* ARUNX — News Feed */
const News = {
  mockArticles: [
    {
      id: 1,
      title: 'AI Revolution in Job Market 2026',
      excerpt: 'How artificial intelligence is transforming recruitment and career paths...',
      category: 'AI',
      date: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Top Tech Skills for 2026',
      excerpt: 'The most in-demand skills employers are looking for this year...',
      category: 'Tech',
      date: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Remote Work Best Practices',
      excerpt: 'Essential tips for thriving in remote and hybrid work environments...',
      category: 'Career',
      date: new Date().toISOString()
    }
  ],
  
  getArticles(category = null) {
    if (category) {
      return this.mockArticles.filter(a => a.category === category);
    }
    return this.mockArticles;
  }
};

window.News = News;