import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTE2NTRlZGI4ZGZlZjQwMGZiYzRmZmFjMTEzNDRmZiIsIm5iZiI6MTc0NDQ5NjA0MC4wNDYwMDAyLCJzdWIiOiI2N2ZhZTVhOGVjMjJiYTNiNDlkOTE0YjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.qZHWEVuyNudDjgUYQ3Z-NG738evXCIoQp7f9MF-QmAM',

    },
})

export default instance;