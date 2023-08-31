export default function EntityCount(props) {
      const [entityData, setEntityData] = useState([]);
      const [isDataFetched, setIsDataFetched] = useState(false);
      const [isError, setIsError] = useState(false);
      const [sorting, setSorting] = useState({ sortingKey: '', sortReverse: false });
      const [pagination, setPagination] = useState({ page: 1, startIndex: 0, endIndex: 10 });

      const getEntityData = () => {
            const { token } = props;
            request
                  .get(`${config.API_URL}/v0/ui/ops/get-supplier-summary-agencywise/?page=${pagination.page}`)
                  .set('Authorization', `JWT ${token}`)
                  .then((resp) => {
                        const { status, data } = resp.body;
                        if (status) {
                              const getData = Object.keys(data).map((key, index) => ({
                                    ...data[key],
                                    type: key,
                                    key: index,
                              }));
                              setEntityData(getData);
                              setIsDataFetched(true);
                        }
                  })
                  .catch((ex) => {
                        console.log('Failed to get data');
                        setIsError(true);
                        setIsDataFetched(true);
                  });
      };

      function handlePageChange(event) {
            let page = event.selected + 1;
            let start = page * 10;
            let end = start + 10;
            let obj = { page: page, startIndex: start, endIndex: end };
            setTimeout(() => {
                  setPagination(obj);
            }, 3000);
            console.log(pagination, 'handlePageChange');
            // getEntityData();
      }
      function sortingData(tableData, accessKey, reverse, type) {
            let newList = sortingTableData(tableData, accessKey, reverse, type);
            setEntityData(newList);
            setSorting({ sortingKey: accessKey, sortReverse: !sorting.sortReverse });
      }
      useEffect(() => {
            getEntityData();
      }, [pagination]);

      return (
            <div style={{ marginTop: '1em' }}>
                  <TableHeader headerValue="Entity Report" />
                  {isDataFetched ? (
                        <>
                              <Table responsive className={`react-bootstrap-custom-table v-middle`}>
                                    <thead>
                                          <tr>
                                                <th
                                                      rowSpan="2"
                                                      className={`sortable ${sorting?.sortingKey == 'supplier_type'
                                                            ? `${sorting.sortReverse ? 'asc' : 'desc'}`
                                                            : ''
                                                            }`}
                                                      onClick={(e) => {
                                                            sortingData(entityData, 'supplier_type', sorting.sortReverse);
                                                      }}
                                                >
                                                      Entity Type
                                                </th>
                                                <th
                                                      rowSpan="2"
                                                      className={`sortable ${sorting.sortingKey == 'count' ? `${sorting.sortReverse ? 'asc' : 'desc'}` : ''
                                                            }`}
                                                      onClick={(e) => {
                                                            sortingData(entityData, 'count', sorting.sortReverse, 'Number');
                                                      }}
                                                >
                                                      Entity Count
                                                </th>
                                                <th rowSpan="2">Company</th>
                                                <th colSpan="3">Contact Name</th>
                                                <th colSpan="3">Contact Number</th>
                                          </tr>
                                          <tr>
                                                <th>Filled(Unique)</th>
                                                <th>Total Filled</th>
                                                <th>Not Filled</th>
                                                <th>Filled(Unique)</th>
                                                <th>Total Filled</th>
                                                <th>Not Filled</th>
                                          </tr>
                                    </thead>
                                    <tbody id="rows">
                                          {entityData?.slice(pagination.startIndex, pagination.endIndex).map((item, index) => {
                                                return (
                                                      <tr key={index}>
                                                            <td>
                                                                  {item.count > 0 ? (
                                                                        <Link
                                                                              style={{ color: '#3e59e3' }}
                                                                              to={{
                                                                                    pathname: `city/${item?.supplier_type}/`,
                                                                                    state: {
                                                                                          supplier_type: item?.supplier_type,
                                                                                          name: item?.supplier_type,
                                                                                    },
                                                                              }}
                                                                        >
                                                                              {' '}
                                                                              {item.supplier_type}
                                                                        </Link>
                                                                  ) : (
                                                                        item.supplier_type
                                                                  )}
                                                            </td>
                                                            <td>{item.count}</td>
                                                            <td>{item.company}</td>
                                                            {index == 0 && (
                                                                  <td colSpan={6} rowSpan={10} style={{ background: '#eee' }}>
                                                                        Comming Soon
                                                                  </td>
                                                            )}
                                                      </tr>
                                                );
                                          })}
                                    </tbody>
                              </Table>
                              <ReactPagination
                                    pageNo={pagination.page - 1}
                                    pageSize={10}
                                    totalItems={entityData.length}
                                    onPageChange={handlePageChange}
                              />
                        </>
                  ) : (
                        <LoadingWrapper />
                  )}
            </div>
      );
}