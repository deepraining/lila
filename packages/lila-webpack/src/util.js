import path from 'path';

const { join } = path;

export const getAllPages = ({ pages, getPages, srcPath }) => {
  const allPages = [];

  pages.forEach(page => {
    if (page === '*' || page === 'all')
      allPages.push(...(getPages(srcPath) || []));
    else if (page.slice(-2) === '/*')
      allPages.push(...(getPages(join(srcPath, page.slice(0, -2))) || []));
    else if (page.slice(-4) === '/all')
      allPages.push(...(getPages(join(srcPath, page.slice(0, -4))) || []));
    else allPages.push(page);
  });

  return allPages;
};

// placeholder
export default {};
