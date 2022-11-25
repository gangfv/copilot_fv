const Cookies = {
    getCookies(cookieName) {
        const cookies = document.cookie.split('; ').map(cookString => cookString.split('='))
        let data = {}
        cookies.forEach((cookie) => {
            data = {...data, ...{[cookie[0]]: cookie[1]} }
        })

        if(!!cookieName) {
            return data[cookieName]
        }

        return data
    },

    setCookie(cookieName, cookieVal) {
        const DateNow = new Date()

        let Day = DateNow.getDate()
        let Month = DateNow.getMonth()
        let Year = DateNow.getFullYear()

        const expires = new Date(Year, Month, Day+10).toUTCString()

        document.cookie = `${cookieName}=${cookieVal}; domain=localhost; expires=${expires}; path='/';`
    },

    delCookie(cookieName) {

        const expires = new Date().toUTCString()
        console.log(expires)

        document.cookie = `${cookieName}=${null}; domain=localhost; expires=${expires}; path='/';`
    }
}