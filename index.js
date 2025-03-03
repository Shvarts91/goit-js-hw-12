import{a as y,S as h,i as v}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();async function L(e,t,a){try{return(await y.get("https://pixabay.com/api/",{params:{key:"48923193-3438f3437d6b65fcb88350802",q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:a,page:t}})).data}catch(o){alert(o)}}const b=document.querySelector(".list-images");function w(e){const t=e.map(a=>`<li>
    <a class='gallery-link' href='${a.largeImageURL}'>
    <img class='gallery-img' src='${a.webformatURL}' alt='${a.tags}'>
    <div class='image-info-block'>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Likes</span>
    <span class='image-value-parametr'>${a.likes}</span>
    </p>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Views</span>
    <span class='image-value-parametr'>${a.views}</span>
    </p>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Comments</span>
    <span class='image-value-parametr'>${a.comments}</span>
    </p>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Downloads</span>
    <span class='image-value-parametr'>${a.downloads}</span>
    </p>
    </div>
    </a>
    </li>`).join("");b.insertAdjacentHTML("beforeend",t)}const S=document.querySelector("form"),n=document.querySelector(".input-form"),p=document.querySelector(".list-images"),q=document.querySelector(".loader"),c=document.querySelector(".button-more");let i=1;const g=40;let f=new h(".list-images a");f.on("show.simplelightbox",function(){});S.addEventListener("submit",async e=>{e.preventDefault(),n.blur(),n.value.trim()&&(P(),i=1,d(n.value,!0))});c.addEventListener("click",async()=>{i++,d(n.value,!1)});async function d(e,t){u(!0),M(!1);const{hits:a,totalHits:o}=await L(e,i,g);if(u(!1),!(a!=null&&a.length)){m("Sorry, there are no images matching your search query. Please try again!","#ef4040");return}p.classList.remove("visually-hidden"),w(a),f.refresh(),$(o)?m("We're sorry, but you've reached the end of search results.","green"):c.classList.remove("visually-hidden"),t||I()}function u(e){q.classList.toggle("is-active",e)}function P(){return p.innerHTML=""}function $(e){return Math.ceil(e/g)===i}function m(e,t){v.show({message:e,position:"topRight",backgroundColor:t,messageColor:"#fafafb",messageSize:"16"})}function I(){var t;const e=((t=document.querySelector("li"))==null?void 0:t.getBoundingClientRect().height)||0;window.scrollBy({top:e*2+72,behavior:"smooth"})}function M(e){c.classList.toggle("visually-hidden",!e)}
//# sourceMappingURL=index.js.map
