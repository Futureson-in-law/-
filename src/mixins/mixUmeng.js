/* eslint-disable */
/******************* 友盟埋点 *******************/

const SITE_ID = 1279950392 // 站点ID          

export default {
    mounted() {
        this.$nextTick(() => {
            const script = document.createElement('script')
            script.src = `https://s4.cnzz.com/z_stat.php?id=${SITE_ID}&web_id=${SITE_ID}`
            script.language = 'JavaScript'
            script.id = 'cnzz'
            document.body.appendChild(script)
        })
    }
}