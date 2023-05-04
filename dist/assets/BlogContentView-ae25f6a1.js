import{d,o as a,c as l,e as y,f as b,g as _,h as x,i as I,j as M,w as C,v as V,a as n,k as B,t as i,l as t,F as T,r as S,m as q,n as A,p as D,b as P,q as E,u as F,_ as j}from"./index-08d92113.js";const W={class:"markdown-body"},H=y(`<h1>vite-plugin-md</h1><p>Markdown for Vite</p><ul><li>Use Markdown as Vue components</li><li>Use Vue components in Markdown</li><li>Extend functionality with <strong>Builder API</strong></li></ul><p><a href="https://www.npmjs.com/package/vite-plugin-md"><img src="https://img.shields.io/npm/v/vite-plugin-md?color=a1b858" alt="NPM version"></a></p><blockquote><p>From v0.13, we introduced a pipeline and builder engine (<a href="https://github.com/antfu/vite-plugin-md/pull/54">#54</a>, <a href="https://github.com/antfu/vite-plugin-md/pull/77">#77</a>) to provide full customizability. If you still prefer the simple Markdown-to-Vue transformation prior to v0.13, it has been moved to <a href="https://github.com/antfu/vite-plugin-vue-markdown"><code>vite-plugin-vue-markdown</code></a>.</p></blockquote><h2>Installing this Plugin</h2><p>Installation can be done in a few simple steps. From the root of your repo do the following:</p><ol><li><p><strong>NPM Install</strong></p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">bash</span></div><div class="code-block language-shell-session no-line-numbers" data-lang="bash" data-modifiers=""><pre class="language-shell-session" data-lang="bash"><code class="code-line odd first-row line-1"><span class="token output">npm i vite-plugin-md -D # yarn add vite-plugin-md -D</span></code></pre></div></div></li><li><p><strong>Vite Configuration</strong></p><p>Add the following to your <code>vite.config.js</code> / <code>vite.config.ts</code> file:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">ts</span></div><div class="code-block language-typescript no-line-numbers" data-lang="ts" data-modifiers=""><pre class="language-typescript" data-lang="ts"><code class="code-line odd first-row line-1"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span></code>
<code class="code-line even line-2"><span class="token keyword">import</span> Markdown <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-md&#39;</span></code>
<code class="code-line odd line-3"></code>
<code class="code-line even line-4"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></code>
<code class="code-line odd line-5">  plugins<span class="token operator">:</span> <span class="token punctuation">[</span></code>
<code class="code-line even line-6">    <span class="token function">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span></code>
<code class="code-line odd line-7">      include<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.md$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// &lt;--</span></code>
<code class="code-line even line-8">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></code>
<code class="code-line odd line-9">    <span class="token function">Markdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></code>
<code class="code-line even line-10">  <span class="token punctuation">]</span><span class="token punctuation">,</span></code>
<code class="code-line odd last-row line-11"><span class="token punctuation">}</span></code></pre></div></div><blockquote><p>This adds the VueJS along with <em>this</em> repo as “plugins” to Vite. With VueJS you’ll also want to make sure to include both <code>vue</code> and <code>md</code> files.</p></blockquote></li><li><p><strong>Typescript Config</strong> (optional)</p><p>If you’re using Typescript than you’ll want take the additional step of adding a “shim file” to help Typescript to understand how to think of Vue SFC files and Markdown files structurally. For VueJS developers, you’ve probably already done this for your VueJS files but you can wrap this up with a single file – <code>shims.d.ts</code> – in the root of your repo:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">ts</span></div><div class="code-block language-typescript no-line-numbers" data-lang="ts" data-modifiers=""><pre class="language-typescript" data-lang="ts"><code class="code-line odd first-row line-1"><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;*.vue&#39;</span> <span class="token punctuation">{</span></code>
<code class="code-line even line-2">  <span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> ComponentOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span></code>
<code class="code-line odd line-3">  <span class="token keyword">const</span> Component<span class="token operator">:</span> ComponentOptions</code>
<code class="code-line even line-4">  <span class="token keyword">export</span> <span class="token keyword">default</span> Component</code>
<code class="code-line odd line-5"><span class="token punctuation">}</span></code>
<code class="code-line even line-6"></code>
<code class="code-line odd line-7"><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;*.md&#39;</span> <span class="token punctuation">{</span></code>
<code class="code-line even line-8">  <span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> ComponentOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span></code>
<code class="code-line odd line-9">  <span class="token keyword">const</span> Component<span class="token operator">:</span> ComponentOptions</code>
<code class="code-line even line-10">  <span class="token keyword">export</span> <span class="token keyword">default</span> Component</code>
<code class="code-line odd last-row line-11"><span class="token punctuation">}</span></code></pre></div></div></li><li><p><strong>Builder Installs</strong> (optional)</p><p>Modern versions of this plugin provide a powerful pipeline system for extending the functionality of this plugin. You can use provided/recommended plugins but you can create these yourself. More on this below but for now be aware that the three <em>builders</em> which had been originally included as internal builders are now “external” to both demonstrate how you can do this and to keep this repo more focused on core pipelining.</p><p>The three “built-in” builders were <code>code()</code>, <code>link()</code>, and <code>meta()</code>. Instead of importing them directly as symbols from this repo you can now just import them directly from their repos:</p><ul><li><p><strong>code</strong> - <code>pnpm add -D @yankeeinlondon/code-builder</code></p><blockquote><p><code>npm install -D @yankeeinlondon/code-builder</code></p></blockquote><blockquote><p><code>yarn add -D @yankeeinlondon/code-builder</code></p></blockquote></li><li><p><strong>meta</strong> - <code>pnpm add --save-dev @yankeeinlondon/meta-builder</code></p></li><li><p><strong>link</strong> - <code>pnpm add --save-dev @yankeeinlondon/link-builder</code></p></li></ul><p>At this point the process is exactly the same as before, you simply add these builders into the configuration for this repo like so:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">ts</span></div><div class="code-block language-typescript no-line-numbers" data-lang="ts" data-modifiers=""><pre class="language-typescript" data-lang="ts"><code class="code-line odd first-row line-1"><span class="token keyword">import</span> Markdown <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-md&#39;</span></code>
<code class="code-line even line-2"><span class="token keyword">import</span> code <span class="token keyword">from</span> <span class="token string">&#39;@yankeeinlondon/code-builder&#39;</span></code>
<code class="code-line odd line-3"></code>
<code class="code-line even line-4"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></code>
<code class="code-line odd line-5">  plugins<span class="token operator">:</span> <span class="token punctuation">[</span></code>
<code class="code-line even line-6">    <span class="token function">Markdown</span><span class="token punctuation">(</span><span class="token punctuation">{</span></code>
<code class="code-line odd line-7">      builders<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span></code>
<code class="code-line even line-8">    <span class="token punctuation">}</span><span class="token punctuation">)</span></code>
<code class="code-line odd line-9">  <span class="token punctuation">]</span></code>
<code class="code-line even last-row line-10"><span class="token punctuation">}</span></code></pre></div></div><blockquote><p><strong>Note:</strong> <code>code</code>, <code>meta</code>, and <code>link</code> can all be imported from <a href="https://github.com/yankeeinlondon/md-powerpack"><strong>md-powerpack</strong></a> – <code>npm install -D md-powerpack</code> – which is an aggregation repo for builder API’s. Either approach is equally valid.</p></blockquote></li></ol><h2>Using this Plugin</h2><p>Refer to the <em>example</em> app in this repo for a working example but the really short answer is … just write markdown files in the same places where you might have written VueJS SFC components and they will both be treated as Vue components in every way.</p><p>That means you can:</p><ol><li><p><strong>Import Markdown</strong> as Vue components</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">vue</span></div><div class="code-block language-handlebars no-line-numbers" data-lang="vue" data-modifiers=""><pre class="language-handlebars" data-lang="vue"><code class="code-line odd first-row line-1"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></code>
<code class="code-line even line-2">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>HelloWorld</span> <span class="token punctuation">/&gt;</span></span></code>
<code class="code-line odd line-3"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></code>
<code class="code-line even line-4"></code>
<code class="code-line odd line-5"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span></code>
<code class="code-line even line-6">import HelloWorld from &#39;./README.md&#39;</code>
<code class="code-line odd line-7"></code>
<code class="code-line even line-8">export default {</code>
<code class="code-line odd line-9">  components: {</code>
<code class="code-line even line-10">    HelloWorld,</code>
<code class="code-line odd line-11">  },</code>
<code class="code-line even line-12">}</code>
<code class="code-line odd last-row line-13"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></code></pre></div></div></li><li><p>Use <strong>Vue Components</strong> inside your Markdown</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">markdown</span></div><div class="code-block language-markdown no-line-numbers" data-lang="markdown" data-modifiers=""><pre class="language-markdown" data-lang="markdown"><code class="code-line odd first-row line-1"><span class="token title important"><span class="token punctuation">#</span> My Page</span></code>
<code class="code-line even line-2">There I was, there I was ... in the jungle. Then I started hearing this ticking sound and I realized it was some sort of <span class="token italic"><span class="token punctuation">_</span><span class="token content">counter</span><span class="token punctuation">_</span></span>?</code>
<code class="code-line odd line-3"></code>
<code class="code-line even line-4"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Counter</span> <span class="token attr-name">:init</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>5<span class="token punctuation">&#39;</span></span><span class="token punctuation">/&gt;</span></span></code>
<code class="code-line odd line-5"></code>
<code class="code-line even last-row line-6">I looked a bit closer and realized I could <span class="token bold"><span class="token punctuation">**</span><span class="token content">press</span><span class="token punctuation">**</span></span> this counter and it would change! What is this magic?</code></pre></div></div><p>In this example we use a custom Vue component called <code>Counter</code> (actually found in the demo app) and intermix it with our Markdown content. In this example we leveraged the ability to automatically import components with the powerful Vite plugin <a href="https://github.com/antfu/unplugin-vue-components"><code>unplugin-vue-components</code></a> but if you prefer not to you can just manually import some components globally or you can also add the following block to your Markdown:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">markdown</span></div><div class="code-block language-markdown no-line-numbers" data-lang="markdown" data-modifiers=""><pre class="language-markdown" data-lang="markdown"><code class="code-line odd first-row line-1"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span></code>
<code class="code-line even line-2">import { Counter } from &#39;./Counter.vue&#39;</code>
<code class="code-line odd last-row line-3"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></code></pre></div></div><p>In most cases, however, use of the <code>unplugin-vue-components</code> just makes life simpler. :)</p></li><li><p><strong>Frontmatter</strong></p><p>Frontmatter is a meta-data standard used with most of the static content frameworks and allows you to put name/value pairs at the top of your Markdown files and then use this content within the page. For example:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">md</span></div><div class="code-block language-markdown no-line-numbers" data-lang="md" data-modifiers=""><pre class="language-markdown" data-lang="md"><code class="code-line odd first-row line-1"><span class="token hr punctuation">---</span></code>
<code class="code-line even line-2">name: My Cool App</code>
<code class="code-line odd line-3"><span class="token hr punctuation">---</span></code>
<code class="code-line even line-4"></code>
<code class="code-line odd line-5"><span class="token title important"><span class="token punctuation">#</span> Hello World</span></code>
<code class="code-line even line-6"></code>
<code class="code-line odd last-row line-7">This is {{name}}</code></pre></div></div><p>Will be rendered as:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">html</span></div><div class="code-block language-handlebars no-line-numbers" data-lang="html" data-modifiers=""><pre class="language-handlebars" data-lang="html"><code class="code-line odd first-row line-1"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span></code>
<code class="code-line even last-row line-2"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>This is My Cool App<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></code></pre></div></div><p><strong>Leveraging Meta Properties</strong></p><p>It is often useful to have certain “meta properties” associated with your pages and you can do this easily in one of two ways:</p><ol><li>If you use <code>@vueuse/head</code> then you can enable the <code>headEnabled</code> configuration option</li><li>If you want to go further you can add the <a href="https://github.com/yankeeinlondon/meta-builder"><code>meta()</code></a> builder mentioned above</li></ol><p>With both options you can start to add frontmatter like this:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">yaml</span></div><div class="code-block language-yaml no-line-numbers" data-lang="yaml" data-modifiers=""><pre class="language-yaml" data-lang="yaml"><code class="code-line odd first-row line-1">meta<span class="token punctuation">:</span></code>
<code class="code-line even line-2">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> My Cool App</code>
<code class="code-line odd last-row line-3">    <span class="token key atrule">description</span><span class="token punctuation">:</span> cool things happen to people who use cool apps</code></pre></div></div><p>This will then intelligently be incorporated into <code>&lt;meta&gt;</code> tags in the resulting output. For more information look at the corresponding docs:</p><ul><li><a href="https://github.com/vueuse/head">Docs for <code>@vueuse/head</code></a></li><li><a href="https://github.com/yankeeinlondon/meta-builder">Docs for <code>@yankeeinlondon/meta-builder</code></a></li></ul></li><li><p>Import Frontmatter from Markdown</p><p>Not only can you import Markdown files as VueJS components (using the <em>default</em> import) but you can also import a Markdown file’s frontmatter via a named export:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">ts</span></div><div class="code-block language-typescript no-line-numbers" data-lang="ts" data-modifiers=""><pre class="language-typescript" data-lang="ts"><code class="code-line odd first-row line-1"><span class="token keyword">import</span> <span class="token punctuation">{</span> frontmatter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;my-app.md&#39;</span></code></pre></div></div></li></ol><h2>Configuration / Options</h2><ol><li><p><strong>Options Hash</strong></p><p>The configuration for this plugin is a fully typed dictionary of options and therefore is largely self-documenting.</p><p>See <a href="./src/types.ts">the ts-doc</a> for more advanced options</p></li><li><p><strong>Markdown-It</strong> plugins (and options)</p><p>Under the hood this plugin leverages <a href="https://github.com/markdown-it/markdown-it"><code>markdown-it</code></a> for converting Markdown content to HTML. This parser is very mature and has a rich set of plugins that you use quite easily. If you don’t find what you want you can also build your own plugin relatively easily [ <a href="https://markdown-it.github.io/markdown-it/">docs</a> ].</p><p>Whether you’re <em>using</em> or <em>building</em> a plugin, you will incorporate it into this plugin using the <code>markdownItSetup</code> property. Alternatively you can also set configuration options of <strong>markdown-it</strong> with <code>markdownItOptions</code>:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">ts</span></div><div class="code-block language-typescript no-line-numbers" data-lang="ts" data-modifiers=""><pre class="language-typescript" data-lang="ts"><code class="code-line odd first-row line-1"><span class="token comment">// vite.config.js</span></code>
<code class="code-line even line-2"><span class="token keyword">import</span> Markdown <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-md&#39;</span></code>
<code class="code-line odd line-3"></code>
<code class="code-line even line-4"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></code>
<code class="code-line odd line-5">  plugins<span class="token operator">:</span> <span class="token punctuation">[</span></code>
<code class="code-line even line-6">    <span class="token function">Markdown</span><span class="token punctuation">(</span><span class="token punctuation">{</span></code>
<code class="code-line odd line-7">      markdownItOptions<span class="token operator">:</span> <span class="token punctuation">{</span></code>
<code class="code-line even line-8">        html<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></code>
<code class="code-line odd line-9">        linkify<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></code>
<code class="code-line even line-10">        typographer<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></code>
<code class="code-line odd line-11">      <span class="token punctuation">}</span><span class="token punctuation">,</span></code>
<code class="code-line even line-12">      <span class="token function">markdownItSetup</span><span class="token punctuation">(</span>md<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
<code class="code-line odd line-13">        <span class="token comment">// add anchor links to your H[x] tags</span></code>
<code class="code-line even line-14">        md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-anchor&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code>
<code class="code-line odd line-15">        <span class="token comment">// add code syntax highlighting with Prism</span></code>
<code class="code-line even line-16">        md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-prism&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code>
<code class="code-line odd line-17">      <span class="token punctuation">}</span><span class="token punctuation">,</span></code>
<code class="code-line even line-18">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></code>
<code class="code-line odd line-19">  <span class="token punctuation">]</span><span class="token punctuation">,</span></code>
<code class="code-line even last-row line-20"><span class="token punctuation">}</span></code></pre></div></div></li><li><p><a href="./docs/BuilderApi.md"><code>Builder APIs</code></a></p><p>Builder API’s are mini-configurators for a particular feature area. The idea behind them is to allow extending functionality quickly with <em>sensible defaults</em> but also providing their own configurations to allow users to grow into and configure that feature area. The Builder API and Builder pipeline are the <em>preferred</em> way of extending the functionality of this plugin where possible but due to the vast array of MarkdownIt plugins you may still need to rely on that ecosystem in some cases.</p><p>To empower developers the docs and a <code>createBuilder</code> utility can be found here:</p><ul><li><a href="https://github.com/yankeeinlondon/builder-api">Builder API</a></li></ul><p>and examples of builders can be found here:</p><ul><li><a href="https://github.com/yankeeinlondon/meta-builder">Meta Builder</a> - now included as part of the core plugin</li><li><a href="https://github.com/yankeeinlondon/link-builder">Link Builder</a></li><li><a href="https://github.com/yankeeinlondon/code-builder">Code Builder</a></li></ul><p>If you wanted to use any of these builders in their default configuration, you would simply add the following to your options config for this plugin:</p><div class="code-wrapper"><div class="heading-row no-heading show-lang"><span class="lang-display">ts</span></div><div class="code-block language-typescript no-line-numbers" data-lang="ts" data-modifiers=""><pre class="language-typescript" data-lang="ts"><code class="code-line odd first-row line-1"><span class="token keyword">import</span> Markdown <span class="token keyword">from</span> <span class="token string">&#39;vite-plugin-md&#39;</span></code>
<code class="code-line even line-2"><span class="token comment">// note: all of these plugins are available as part of an aggregation</span></code>
<code class="code-line odd line-3"><span class="token comment">// repo for Builder APIs (but you can import directly if you prefer)</span></code>
<code class="code-line even line-4"><span class="token keyword">import</span> <span class="token punctuation">{</span> code<span class="token punctuation">,</span> link <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;md-powerpack&#39;</span></code>
<code class="code-line odd line-5"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></code>
<code class="code-line even line-6">  plugins<span class="token operator">:</span> <span class="token punctuation">[</span></code>
<code class="code-line odd line-7">    <span class="token function">Markdown</span><span class="token punctuation">(</span><span class="token punctuation">{</span></code>
<code class="code-line even line-8">      builders<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">link</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span></code>
<code class="code-line odd line-9">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></code>
<code class="code-line even line-10">  <span class="token punctuation">]</span><span class="token punctuation">,</span></code>
<code class="code-line odd last-row line-11"><span class="token punctuation">}</span></code></pre></div></div></li></ol><h2>Example Usage</h2><p>See the <a href="./example">/example</a> app in this repo.</p><p>Or the pre-configured starter template <a href="https://github.com/antfu/vitesse">Vitesse</a>.</p><h2>Integrations</h2><p>This plugin has good integrations with several other plugins, including:</p><ul><li><a href="https://github.com/hannoeru/vite-plugin-pages"><code>vite-plugin-pages</code></a></li><li><a href="https://github.com/antfu/vite-plugin-components"><code>vite-plugin-components</code></a></li><li><a href="https://github.com/JohnCampionJr/vite-plugin-vue-layouts"><code>vite-plugin-vue-layouts</code></a></li><li>for details, refer to the <a href="./docs/Integrations.md">Integration Page</a></li></ul><h2>License</h2><p>MIT License © 2020-PRESENT <a href="https://github.com/antfu">Anthony Fu</a> and <a href="https://github.com/yankeeinlondon">Ken Snyder</a></p>`,22),N=[H],O=d({__name:"README",setup(e,{expose:o}){return o({frontmatter:{},excerpt:void 0}),(c,s)=>(a(),l("div",W,N))}});const R=d({__name:"MDRender",props:{title:{type:String,required:!0}},setup(e){const o=e,c=b({ViteMd:O});return(s,p)=>(a(),l("div",null,[(a(),_(x(c[o.title])))]))}}),J="/assets/back_arrow-accfb274.svg",r=e=>(D("data-v-4dd935bb"),e=e(),P(),e),L={class:"loading"},U={class:"blog-info"},$={class:"left"},z=r(()=>n("img",{src:J},null,-1)),K={class:"title"},Y={class:"tags"},Z={class:"date"},G=r(()=>n("img",{src:E},null,-1)),Q={class:"right"},X=["src"],nn=r(()=>n("svg",{viewBox:"0 0 1440 89",class:"round-decor"},[n("path",{d:"M0 0H1440V69C1440 69 1243.16 111.882 720 69C232 29 0 69 0 69V0Z",fill:"#10181D"})],-1)),en=d({__name:"BlogContentView",setup(e){const o=F(),c=A(),s=I.index.find(u=>u.title===c.query.title),p=M(!1);function f(){o.push({name:"Blog"})}return setTimeout(()=>{p.value=!0},500),(u,sn)=>{var k,g,h,m;const v=R;return C((a(),l("div",L,[n("header",null,[n("div",U,[n("div",$,[n("button",{onClick:f,class:"back"},[z,B("Back")]),n("div",K,i((k=t(s))==null?void 0:k.title),1),n("div",Y,[(a(!0),l(T,null,S((g=t(s))==null?void 0:g.tags,w=>(a(),l("span",{class:"tag",key:w},"#"+i(w),1))),128))]),n("div",Z,[G,n("span",null,i((h=t(s))==null?void 0:h.date),1)])]),n("div",Q,[n("img",{src:(m=t(s))==null?void 0:m.picUrl},null,8,X)])])]),nn,n("main",null,[q(v,{title:t(s).title},null,8,["title"])])],512)),[[V,p.value]])}}});const on=j(en,[["__scopeId","data-v-4dd935bb"]]);export{on as default};
