// ==UserScript==
// @name         Reddit Original Img for Classic view
// @namespace    https://www.reddit.com/
// @version      1.0
// @description  Replase thumb to full size images on click without open post.
// @author       XCanG
// @match        *://www.reddit.com/r/*
// @match        *://reddit.com/r/*
// @grant        none
// ==/UserScript==

(() => {
	"use strict";

	const start = "https://i.redd.it/",
		  styles = document.createElement("style");

	const replace = (a) => {
		console.log(a);
		if (a === document) return false;
		if (a.tagName !== "A" || !a.href.startsWith(start) || a.classList.contains("original_img")) return replace(a.parentNode);

		const img = a.querySelector("img");
		img.src = a.href;
		a.classList.add("original_img");
		return true;
	};

	document.body.addEventListener("click", (e) => { const ret = replace(e.target); if (ret) e.preventDefault(); }, false);

	styles.textContent = "a.original_img { display: block; } a.original_img img { display: block !important; transform-origin: left center; position: relative; z-index: 3; transition: .1s linear; max-width: 100%; max-height: 100%; pointer-events: none; } a.original_img:hover img { max-width: 100vw; max-height: calc(100vh - 50px); position: fixed; top: 50px; bottom: 0; object-fit: scale-down; height: calc(100vh - 50px); } .Post, .Post > div:nth-of-type(2) > div:first-of-type > div:first-of-type > div:first-of-type > div { overflow: visible !important; }";

	document.body.appendChild(styles);
})();
