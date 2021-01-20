var app=function(){"use strict";function e(){}function t(e){return e()}function o(){return Object.create(null)}function n(e){e.forEach(t)}function i(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function s(e,t,o){e.insertBefore(t,o||null)}function r(e){e.parentNode.removeChild(e)}function l(e){return document.createElement(e)}function h(){return e=" ",document.createTextNode(e);var e}function c(e,t,o){null==o?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)}let d;function u(e){d=e}const f=[],m=[],g=[],p=[],b=Promise.resolve();let v=!1;function w(e){g.push(e)}let y=!1;const k=new Set;function q(){if(!y){y=!0;do{for(let e=0;e<f.length;e+=1){const t=f[e];u(t),I(t.$$)}for(u(null),f.length=0;m.length;)m.pop()();for(let e=0;e<g.length;e+=1){const t=g[e];k.has(t)||(k.add(t),t())}g.length=0}while(f.length);for(;p.length;)p.pop()();v=!1,y=!1,k.clear()}}function I(e){if(null!==e.fragment){e.update(),n(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(w)}}const T=new Set;function x(e,t){-1===e.$$.dirty[0]&&(f.push(e),v||(v=!0,b.then(q)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function $(a,s,l,h,c,f,m=[-1]){const g=d;u(a);const p=s.props||{},b=a.$$={fragment:null,ctx:null,props:f,update:e,not_equal:c,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(g?g.$$.context:[]),callbacks:o(),dirty:m,skip_bound:!1};let v=!1;if(b.ctx=l?l(a,p,((e,t,...o)=>{const n=o.length?o[0]:t;return b.ctx&&c(b.ctx[e],b.ctx[e]=n)&&(!b.skip_bound&&b.bound[e]&&b.bound[e](n),v&&x(a,e)),t})):[],b.update(),v=!0,n(b.before_update),b.fragment=!!h&&h(b.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);b.fragment&&b.fragment.l(e),e.forEach(r)}else b.fragment&&b.fragment.c();s.intro&&((y=a.$$.fragment)&&y.i&&(T.delete(y),y.i(k))),function(e,o,a){const{fragment:s,on_mount:r,on_destroy:l,after_update:h}=e.$$;s&&s.m(o,a),w((()=>{const o=r.map(t).filter(i);l?l.push(...o):n(o),e.$$.on_mount=[]})),h.forEach(w)}(a,s.target,s.anchor),q()}var y,k;u(g)}var A='<h1 id="echo-chambers-and-political-polarization-on-social-media-due-to-algorithms">Echo chambers and political polarization on social media due to algorithms</h1>\n<h3 id="_making-sense-of-algorithms_---thibaud-goiffon"><em>Making Sense of Algorithms</em> - Thibaud Goiffon</h3>\n<h4 id="this-ethnographic-research-gather-online-and-local-interviews-discussing-the-subject-of-filtering-algorithms-and-social-media-it-asses-the-critical-hindsight-and-hypothesis-of-user-in-regard-of-the-inner-working-of-the-tools-and-technologies-they-use-daily">This ethnographic research gather online and local interviews discussing the subject of filtering algorithms and social media. It asses the critical hindsight and hypothesis of user in regard of the inner working of the tools and technologies they use daily.</h4>\n<p>To better understand the subject, it\'s best to define what we are talking about, and how it can also be defined by others. We also have to keep in mind naturally occurring phenomenons and biases. It\'s also needed to understand the full implications of this matter. Platforms, playing a big role and users alike should be more sensitive and conscious of those topics. Algorithms have a tangible impact on society and so on the world as a whole.</p>\n<div class="quote">\n    <blockquote>\n        Filter bubbles and echo chambers have both been linked recently by commentators to rapid societal changes such as Brexit and the polarization of the US American society in the course of Donald Trump\'s election campaign. \n    </blockquote>\n    <footer>\n    <div class="author"><a href="https://bpspsychub.onlinelibrary.wiley.com/doi/full/10.1111/bjso.12286">Daniel Geschke, Jan Lorenz, Peter Holtz</a></div>\n    <div class="source">The triple-filter bubble: Using agent-based modelling to test a meta-theoretical framework for the emergence of filter bubbles and echo chambers</div>\n</footer>\n</div>\n<p>A filter bubble – a term coined by Internet activist <a href="https://www.elipariser.org/">Eli Pariser</a> creates a state of intellectual isolation having as potential source personalized searches and filtering algorithms. It\'s also important to notice that filter bubble is not only a digital occurrence, your close and work circle also act as filter bubble. Events, as the unexpected election outcome of 2016 sparked the interest on the subject and the role it might have then played.</p>\n<div class="quote">\n    <blockquote>\nA phenomenon in which a person is exposed to ideas, people, facts, or news that adhere to or are consistent with a particular political or social ideology.\n</blockquote>\n<footer>\n    <div class="author"><a href="https://medium.com/@nicklum/the-surprising-difference-between-filter-bubble-and-echo-chamber-b909ef2542cc">Nick Lum</a></div>\n    <div class="source">The Surprising Difference Between “Filter Bubble” and “Echo Chamber</div>\n</footer>\n</div>\n<div class="img-source">\n    <img alt="Terms denotation" src="./graphic.svg"></img>\n    <div class="source">Source <a href="https://medium.com/@nicklum/the-surprising-difference-between-filter-bubble-and-echo-chamber-b909ef2542cc">Nick Lum</a></div>\n</div>\n<p>Notice how two terms sharing the same denotation are actually used and perceived. Filter bubble being best suited for self-introspection, and echo chamber, viewed as a pejorative term to define the behavior of others.</p>\n<div class="quote">\n    <blockquote>\nA clear majority of Americans (62%) say social-media giants like Facebook have too much control over the news people see on their platforms.\n    </blockquote>\n    <footer>\n    <div class="author"><a href="https://www.pewresearch.org/fact-tank/2018/03/27/americans-complicated-feelings-about-social-media-in-an-era-of-privacy-concerns/">Pew Research Center</a></div>\n    <div class="source">Americans’ complicated feelings about social media in an era of privacy concerns</div>\n</footer>\n</div>\n<h2 id="birds-of-a-feather-flock-together">Birds of a feather flock together</h2>\n<p>When talking about tools and technologies we have to distinguish and take in consideration the biological nature of the user. This doesn\'t mean that as Humans we are inertly flawed and nothing can be done against it. But if natural biases shows to be a factor to certain behaviors that can leads to dramatic outcomes. Being aware of them during the conception of online platforms or tools is important. Maybe part of the responsibilities should fall onto the user as well as the maker. </p>\n<p>Blaming the individual, i.e., the user, on a lack of critical thinking alone is not sufficient and counterproductive. It also protects companies from undertaking fundamental changes on how their platforms operate, let alone other <a href="https://themarkup.org/">dubious activities</a>. If even Big Tech don\'t have the best interest of their users in mind, we can\'t put the burden on the user to self regulate. Algorithm can be put in place or modified to counter self-isolation behaviors and increase the mixing between groups and ideologies.</p>\n<div class="quote">\n  <blockquote>\n    Simulations show that, even without any social or technological filters, echo chambers emerge as a consequence of cognitive mechanisms, such as confirmation bias. [...] Most information filtering is the result of homophily, in the sense that Facebook users have significantly more friends with a political orientation similar to their own.\n  </blockquote>\n  <footer>\n    <div class="author"><a href="https://bpspsychub.onlinelibrary.wiley.com/doi/full/10.1111/bjso.12286">Daniel Geschke, Jan Lorenz, Peter Holtz</a></div>\n    <div class="source">The triple-filter bubble: Using agent-based modelling to test a meta-theoretical framework for the emergence of filter bubbles and echo chambers </div>\n  </footer>\n</div>\n<h2 id="people-in-boxes">People in boxes</h2>\n<p>We can\'t reduce behavior to a binary form but we can categorize them and create an approximation. For the user research phase rather than using age, nationality, sex as an highlighting factor I opted for creating three main categories of interviewed people. Each reflecting a level of expertise on algorithms and usage of technologies. The first pass of interviews constituted of a set of basic questions that allowed me to better understand the way people react to different set of situations. <em>(ex: their usage of social media, reactions and behavior towards certain content and groups.)</em> Quickly, patterns emerged. </p>\n<p>Notice that the nature of this sample is flawed, as the first category was not reachable online, it reduced greatly my  opportunities for interaction. Also, this sample is skewed by the fact that I relied mainly on <strong>Discord</strong> to contact people. I used a casual approach by joining server at random, and started talking to people via text and voice chat.</p>\n<h3 id="i-the-outsider">I. the outsider</h3>\n<p>This category can be described as having an high distrust of the Internet and technology in general. They praise and consider traditional media, by nature more reliable and depend mainly on them to get information. A certain disdain for new technologies was noticeable in some, but also admiration and pride on the technological advance of mankind.</p>\n<p>The conversation quickly became stale on the subject of algorithm, "too fuzzy to even get the outline" as one remarked. So I decided to steer the conversation toward  familiar concepts, talking about the way they get news, the relationship between those methods. A majority felt fatalistic and powerless on the state of the world, admitting that they stayed passive toward the inflow of information they receive daily. Maybe social networks, on an individual scale give us the illusion of being able to reach and having an impact, as much as the Internet impact the world.</p>\n<div class="quote">\n  <blockquote>I hear how much technology is liberating and useful. In the end, I wonder if your generation is really that free compared to ours.\n  </blockquote>\n</div>\n<h4 id="the-gatekeeper-has-retired">The gatekeeper has retired</h4>\n<p>Although this category is not, or quite unfamiliar with the Internet and by extension social media, parallel between traditional medias could be made and used as a common ground. While discussing on this subject, the topic of the gatekeeper emerged.</p>\n<div class="quote">\n  <blockquote>I have no hypothesis on how the algorithm works, for me, it means nothing.\n  </blockquote>\n</div>\n<p>Questions on who decides what to be showed, when and to whom was a way to asses their perception of those medias. This was useful for explaining that filtering algorithm were similar on the Internet, at a greater scale, as anyone can create content and share it.</p>\n<p>The main issue with traditional gatekeepers and digital ones is that, for the former, it was the role of the editor to curate content, now the role was passed to algorithms… Current social media might not have the same sense of ethics, or none at all. We might need a journalist ethic equivalent for algorithms.</p>\n<h3 id="ii-the-regular">II. the regular</h3>\n<p>This second category groups a wide range of users. From people with basic computer literacy to advanced usage. They often adopt a cynical point of view with a sense of impending doom and an undertone of general despair. They get the idea of an algorithm and the inner working of the systems.</p>\n<div class="quote">\n  <blockquote>We are products, nothing is going to change\n  </blockquote>\n</div>\n<p>The ethic on social platforms is often reduced as \'as long as it doesn\'t infringe the rules\', but is felt as "as long as it doesn\'t compromise the money making process" .</p>\n<p>Recent scandal like the "Cambridge Analytica" reveled the deep flaws of these platforms. The belief that content will auto regulate itself. They didn\'t deem moderation as needed or even important, not caring if fake news is being openly broadcasted by their network.</p>\n<h4 id="silently-lurking">Silently lurking</h4>\n<p>They often described themselves more often in a "lurking" phase, looking through content on their feed and alternating between active and passive behavior.</p>\n<div class="quote">\n  <blockquote>I used to react in the debates but I\'ve become demotivated because it is an endless fight. Now, I flag extreme right posts for my own pleasure.\n  </blockquote>\n  <footer>\n    <div class="author">Laurent</div>\n    <div class="source">A lurking regular</div>\n  </footer>\n</div>\n<p>The awareness on fact checking is disparate for this category. Ranging from being able to tell from fake news, link bait, to being gullible toward consumed content. A certain naivety displayed by the belief that everything showed online can be deemed legit.</p>\n<div class="quote">\n  <blockquote>As a youtube user, I see a lot of video describing the application\'s algorithm. So I\'m kind of aware of it, but I couldn\'t tell you precisely how it works.\n  </blockquote>\n  <footer>\n    <div class="author">Flummox</div>\n    <div class="source">A regular youtube user</div>\n  </footer>\n</div>\n<p>The user of platforms is not equal to algorithm awareness. A majority of youtube users showed a deeper understanding of how those platforms operate. The subject of politics came rather quickly. Users were able to attach political tendencies to certain platforms, although this thought tendency contradicted and shifted a lot between interview.</p>\n<div class="quote">\n  <blockquote>Twitter\'s community has more of a binary standpoint on politics. You tend to consult profiles and switch from posts to posts, so you quickly come across things that you don\'t like as much. I mostly encounter extreme right posts on Twitter contrary to Facebook, It\'s a network that often takes me out of my comfort zone.\n  </blockquote>\n  <footer>\n    <div class="author">Anonymous</div>\n    <div class="source">a Tweeter</div>\n  </footer>\n</div>\n<h3 id="iii-the-whiz">III. the whiz</h3>\n<p>This last category is often opinionated on the subject, and very aware of system at work. They also display a deeper understanding of the whole technological aspect. Note that the nature of their profession often linked to the tech world. The general mood of this category was a delusional feeling toward current state of the world. This is also reflected in their behavior, arguing online is often viewed as a waste of time.</p>\n<div class="quote">\n  <blockquote>\n    When I see something opposed to my view I usually shrug it off, don\'t care enough to the point where i start arguing with someone online.\n  </blockquote>\n  <footer>\n    <div class="author">Blitzwing12</div>\n    <div class="source">A wise whiz</div>\n  </footer>\n</div>\n<div class="quote">\n  <blockquote>I have created a private discord server that mirrors everything I follow into separate channels across different platforms so I only have to check this one place to see what\'s going on instead of keeping up with 10+ websites that same way. I go behind any algorithm\'s back.\n  </blockquote>\n  <footer>\n    <div class="author">Anonymous</div>\n    <div class="source">A shy whiz</div>\n  </footer>\n</div>\n<h2 id="online-tribalism-and-the-mainstreaming-of-extreme-ideologies">Online Tribalism and the mainstreaming of extreme ideologies</h2>\n<p>It would be ridiculous to assume that this issue <a href="https://www.youtube.com/watch?v=xwA4k0E51Oo">concern online news feed only</a>. Maybe this can be deemed as too dramatic, but the state of the open web is undermined. There is always been the presence of a fringe culture on the Internet, but now it\'s creeping into regular users joining services reserved for a certain ideology. Composed of the equivalent of certain country\'s demography. This tendency amplify division between Internet user, as a technology that was hoped to gather is now dividing and helping extremism to form and thrive on custom platforms.</p>\n<div class="quote">\n  <blockquote>\n    We spent three months undercover doing ethnographic research in previously unexplored forums, and analysed over 5,000 pieces of content gathered from across more than 50 different platforms. \n  </blockquote>\n  <footer>\n    <div class="author"><a href="https://www.isdglobal.org/wp-content/uploads/2018/10/The-Fringe-Insurgency-090819.pdf">Jacob Davey, Julia Ebner </a></div>\n    <div class="source">The Fringe Insurgency Connectivity, Convergence and Mainstreaming of the Extreme Right\n</div>\n  </footer>\n</div>\n<p>For almost 10 years Facebook gave itself the mission to connect the entire world. What happens when a company with private interest become the prime news feed of millions of people? Thus by doing so, taking the place of the open web for a majority of its user base.</p>\n<p>We are now attending a big witch hunt, thinking that if extremism is chased out of popular networks it will cease to exist. The reality is that the outcast will just find or build other platforms to share and communicate ideas. What\'s more dangerous is that by doing so the division is exacerbated even more. Creating resentment and putting aside dialogue is never a good idea.</p>\n<p>What\'s no longer seen might just be hidden from view.</p>';function j(t){let o,n,i,a=A+"";return{c(){o=l("header"),n=h(),i=l("main"),c(o,"class","svelte-14whogk"),c(i,"class","svelte-14whogk")},m(e,t){s(e,o,t),s(e,n,t),s(e,i,t),i.innerHTML=a},p:e,i:e,o:e,d(e){e&&r(o),e&&r(n),e&&r(i)}}}return new class extends class{$destroy(){!function(e,t){const o=e.$$;null!==o.fragment&&(n(o.on_destroy),o.fragment&&o.fragment.d(t),o.on_destroy=o.fragment=null,o.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(t),()=>{const e=o.indexOf(t);-1!==e&&o.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),$(this,e,null,j,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
