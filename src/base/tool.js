const request = async (url, method, params) => {
    const base = "http://api.hallo.site/api/"
    const res = await fetch(base + url, {
        method,
        body: JSON.stringify(params),
        credentials: "include",
        mode: "cors"
    })
    if (res.ok) {
        return res.json()
    } else {
        alert("http error")
        console.log(res.status, res.statusText)
    }
}

export default {
    request
}
