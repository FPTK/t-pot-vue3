export default {
    getDisk() {
        const data = {
            "status": "true", "disk_info":
                [['/dev/mapper/HJ--DEV--vg-root', '365G', '38G', '309G', '11%', '/']
                    , ['/dev/sda1', '472M', '85M', '363M', '19%', '/boot']]
        }
        return data
    },

    getTime() {
        return new Date()
    }
}