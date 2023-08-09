export const getRoutes = function (routes) {
    createRoute(routes)
    return routes
}

const createRoute = (route) => {
    route.forEach(item => {
        let component = import(`@/${item.component}.vue`)
        item.component = ()=>component
        if(item.children){
            createRoute(item.children)
        }
    })
}