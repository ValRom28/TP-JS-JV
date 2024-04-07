export default function lazyLoadingScript() {
    var lazyloadImages;
    
    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });
      
        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {  
        function lazyload() {
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + window.pageYOffset)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);

        lazyload();
    }
}
