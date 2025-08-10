const images=document.querySelectorAll('.food');
const mobileMedia = window.matchMedia("(max-width:655px)");

mobileMedia.addEventListener('change',function(){
    console.log("The Media chagned");
   if(mobileMedia.matches)
    images.forEach(img=>img.src=flipMediaToMobile(img.src))
    else images.forEach(img=>img.src=flipMobileToDesktop(img.src))
    
})
const flipMediaToMobile=function(name){
   return name.replace("-desktop","-mobile");
}
const flipMobileToDesktop=function(name){
   return name.replace("-mobile","-desktop");
}


// const addToCartBtns=document.querySelectorAll('.item .image-container .buy');
// addToCartBtns.forEach(btn=>btn.addEventListener('click',changeState.bind(this)));
// function changeState(e)
// {
//     this.classList.add("hidden")
//     const container=this.closest('.image-container');
//     const name=container.dataset.name;
//     container.querySelector('.quantity').classList.remove("hidden");

// }

