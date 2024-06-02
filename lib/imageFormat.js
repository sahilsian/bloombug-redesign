// Formatting images for slider component

const imageFormat = (data) => {
    const imageArray = []
    Object.keys(data).forEach(function(key) {
        if(data[key].url) {
            let obj = {
                url: data[key].url,
                width: data[key].width,
                height: data[key].height,
                alt: data[key].alt
            }

            imageArray.push(obj)
        } else {
        }
    })
    return imageArray

}

export default imageFormat