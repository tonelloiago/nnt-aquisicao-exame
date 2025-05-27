// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
<ol class="chapter">
    <li class="chapter-item expanded "><a href="chapters/introducao/introducao.html" target="_parent"><strong aria-hidden="true">1.</strong> Introdução</a></li>
    <li class="chapter-item expanded "><a href="chapters/acolhimento/acolhimento.html" target="_parent"><strong aria-hidden="true">2.</strong> Acolhimento</a></li>
    <li class="chapter-item expanded "><a href="chapters/aquisicao/aquisicao.html" target="_parent"><strong aria-hidden="true">3.</strong> Aquisição de exames</a></li>
    <li>
        <ol class="section">
            <li class="chapter-item expanded menu">
                <a href="chapters/tomografia/tomografia.html" target="_parent"><strong aria-hidden="true">3.1.</strong> Tomografia</a>
                <ol class="submenu">
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#1-seleção-da-opção-3d" target="_parent"><strongaria-hidden="true"> ▪️</strong> Selecionar opção 3D</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#2-escolha-do-exame" target="_parent"><strong aria-hidden="true"> ▪️</strong> Escolha do exame</a>
                                                <li class="chapter-item expanded menu">
                            <ol class="submenu">
                                <li>
                                <li class="chapter-item expanded ">
                                    <a href="chapters/tomografia/tomografia.html#21-dentição" target="_parent"><strong
                                            aria-hidden="true">▪️</strong> Dentição</a>
                                </li>
                                <li class="chapter-item expanded ">
                                    <a href="chapters/tomografia/tomografia.html#tomografia-maxilar"
                                        target="_parent"><strong aria-hidden="true">▪️</strong> Maxilar</a>
                                </li>
                                <li class="chapter-item expanded ">
                                    <a href="chapters/tomografia/tomografia.html#23-articulação-temporomandibular-tmj"
                                        target="_parent"><strong aria-hidden="true">▪️</strong> ATM</a>
                                </li>
                        </li>
                    </ol>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#3-escolha-da-região-anatômica" target="_parent"><strong aria-hidden="true">▪️</strong> Escolha da região anatômica</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#4-configuração-de-qualidade" target="_parent"><strong aria-hidden="true">▪️</strong> Configuração de qualidade</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#5-reset-do-aparelho" target="_parent"><strong aria-hidden="true">▪️</strong> Reset do aparelho</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#6-posicionamento-do-paciente" target="_parent"><strong aria-hidden="true">▪️</strong> Posicionamento do paciente</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#7-testes-de-scout" target="_parent"><strong aria-hidden="true">▪️</strong> Testes de Scout</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#8-realização-do-exame" target="_parent"><strong aria-hidden="true">▪️</strong> Execução do exame</a>
                    </li>
                    <li class="chapter-item expanded ">
                        <a href="chapters/tomografia/tomografia.html#9-exportação-da-tomografia" target="_parent"><strong aria-hidden="true">▪️</strong> Exportação da tomografia</a>
                    </li>
                </ol>
                <a href="https://bernardobellezaufrgs.github.io/protocoloOdontoUFRGS/#tomo-1" target="_parent"><strong aria-hidden="true">3.2</strong> Panorâmica</a>
                <a href="https://bernardobellezaufrgs.github.io/protocoloOdontoUFRGS/#tele-1" target="_parent"><strong aria-hidden="true">3.3</strong> Teleradiografia</a>
            </li>
        </ol>
    </li>
    <li class="chapter-item expanded "><a href="chapters/especificidades/especificidades.html" target="_parent"><strong aria-hidden="true">4.</strong> Adequações com especificidades da solicitação</a></li>
    <div class="sidebar-logos">
        <img src="assets/logo-ufrgs.png" alt="Logo UFRGS">
        <img src="assets/logo-odontologia.png" alt="Logo Odontologia">
        <img src="assets/logo-radiologia.png" alt="Logo Radiologia">
    </div>
</ol>
`;
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
