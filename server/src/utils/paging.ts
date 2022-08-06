export function paging(page: number, total: number) {
  const limit = 15;
  const maxPage = 10;
  const totalPage = Math.ceil(total / limit) ? Math.ceil(total / limit) : 1;

  let currentPage = page ? page : 1;

  if (currentPage > totalPage) {
    currentPage = totalPage;
  }

  let startPage = currentPage - 4;

  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + maxPage - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
  }

  return {
    limit,
    totalPage,
    currentPage,
    startPage,
    endPage,
  };
}
