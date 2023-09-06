import { useFetchWrapper } from "../_helpers/fetch-wrapper";
import API_URL from "../config";

const ApiActions = () => {
      const fetchWrapper = useFetchWrapper();
      const postUserDetail = (data) => {
            return fetchWrapper.post(`app/register`, data).then((res) => {
                  if (res) {
                        console.log(res, "11111111111111111")
                  }
                  else {
                        alert("error")
                  }
            })
      }

      const getArticals = (data) => {
            return fetchWrapper.get(`app/create-artical/`, data).then((res) => {
                  if (res) {
                        return res
                  }
                  else {
                        alert("error")
                  }
            })
      }

      const postArticle = (data) => {
            return fetchWrapper.post(`app/create-artical/`, data).then((res) => {
                  try {
                        alert(res.success)
                  }
                  catch {
                        alert('ERROR')
                  }
            })
      }
      const deleteArticle = (id) => {
            return fetchWrapper.delete(`app/create-artical/${id}`).then((res) => {
            })
      }
      const updateArticle = (data) => {
            return fetchWrapper.put(`app/create-artical/${data?.id}`, data).then((res) => {
                  console.log(res)
            })
      }
      return {
            postUserDetail,
            getArticals,
            postArticle,
            updateArticle,
            deleteArticle
      }

}
export { ApiActions };