const instance = axios.create({
    baseURL: '../api/v1/docs/',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.getCookies('csrftoken')
})


console.log(Cookies.getCookies('csrftoken'))


function clearCode(code) {
    const cleanPy = code.split('\n').filter(string => !string.includes('#')).join('\n')
    const cleanC = cleanPy.split('\n').filter(string => !string.includes('//')).join('\n')
    return cleanC
}


const Code = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            language: '',
            description: '',
            numbers: [1],
            code: '',

            isLoading: false,
            loadingTime: 15
        }
    },
    methods: {
        submitDescription(e) {
            e.preventDefault()
            //
            this.isLoading = true
            // this.startLoader()
            console.log('Отправленное описание', this.description)

            this.loadCode(this.description, this.language)

            //
            this.description = ''
        },
        async loadCode(description, language) {
            let newId = ''
            await instance.post('copilot/', {
                "progr_lan": language,
                "textarea_old": description,
                "textarea_new": ""
            }).then(({data}) => {
                newId = data.id
            })

            console.log(newId)

            let newCode = ''

            let checkId = setInterval(() => {
                console.log('итерация')
                instance.get(`copilot/${newId}/`).then(({data}) => {
                    if(data.textarea_new) {
                        newCode = data.textarea_new
                        console.log('Преобразованный код', newCode)

                        this.setCode(clearCode(newCode))

                        clearInterval(checkId)
                        this.isLoading = false
                    }

                }, () => {
                })
            }, 10000)

            return

        },
        setCode(code) {
            this.code = code
        },

        startLoader() {
            let loaderId = setInterval(() => {
                this.loadingTime--
            }, 1000)

            setTimeout(() => {
                clearInterval(loaderId)
                this.loadingTime = 15
            }, 15000)
        }
    },
    computed: {},
    watch: {
        code(value) {
            let newNumbers = [1]
            for (let i = 1; i < value.split('\n').length; i++) {
                newNumbers.push(i + 1)
            }
            this.numbers = newNumbers
        }
    }
}

Vue.createApp(Code).mount('#app')