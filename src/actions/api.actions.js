import { useFetchWrapper } from "../_helpers/fetch-wrapper";
import API_URL from "../config";

const ApiActions = () => {
      const fetchWrapper = useFetchWrapper();
      const postUserDetail = (data) => {
            console.log(data, "222222222222222")
            return fetchWrapper.post(`app/register`, data).then((res) => {
                  if (res) {
                        console.log(res, "11111111111111111")
                        // alertActions.success(Labels.Save_Success);
                  }
                  else {
                        alert("11error")
                  }
            })
      }
      return {
            postUserDetail
      }

}
export { ApiActions };