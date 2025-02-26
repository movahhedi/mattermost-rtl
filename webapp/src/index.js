import manifest from "./manifest";
import "./style.css"

class MattermostRTLPlugin {
    initialize(registry, store) {
        console.info("Hi! Mattermost RTL plugin initialized...");
        this.interval = setInterval(this.autoDirection, 5000);
    }

    uninitialize() {
        clearInterval(this.interval);
    }

    autoDirection() {
        const selector = "#post_textbox, #edit_textbox, #reply_textbox, #searchBox, " +
            ".post-message__text > p, .post-message__text > ul, .post-message__text > ol";
        for(const element of document.querySelectorAll(selector)) {
            element.setAttribute("dir", "auto")
        }

        /**
         *  In Mattermost 5.34, this CSS rule exists:
         *
         *      .post-message__text > ul { direction: ltr }
         *
         *  We need to cancel its effect. Overriding CSS does not work. We wrap the <ul> element in a <div>,
         *  so the CSS selector does not match it anymore.
         */
        for(const element of document.querySelectorAll(".post-message__text > ul")) {
            element.outerHTML = "<div>" + element.outerHTML + "</div>";
        }
    }
}

window.registerPlugin(manifest.id, new MattermostRTLPlugin());
