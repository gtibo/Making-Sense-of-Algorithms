
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.2' }, detail)));
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var writing = {"html":"<h1 id=\"echo-chambers-and-political-polarization-on-social-media-due-to-algorithms\">Echo chambers and political polarization on social media due to algorithms</h1>\n<h3 id=\"_making-sense-of-algorithms_---thibaud-goiffon\"><em>Making Sense of Algorithms</em> - Thibaud Goiffon</h3>\n<h4 id=\"this-ethnographic-research-gathers-online-and-local-interviews-discussing-the-subject-of-filtering-algorithms-and-social-media-it-asses-the-critical-hindsight-and-hypothesis-of-the-user-in-regard-to-the-inner-working-of-the-tools-and-technologies-they-use-daily\">This ethnographic research gathers online and local interviews discussing the subject of filtering algorithms and social media. It asses the critical hindsight and hypothesis of the user in regard to the inner working of the tools and technologies they use daily.</h4>\n<p>To better understand the subject, it's best to define what we are talking about, and how it can also be defined by others. We also have to keep in mind naturally occurring phenomenons and biases. It's also needed to understand the full implications of this matter. Platforms, playing a big role and users alike should be more sensitive and conscious of those topics. Algorithms have a tangible impact on society and so on the world as a whole.</p>\n<div class=\"quote\">\n    <blockquote>\n        Filter bubbles and echo chambers have both been linked recently by commentators to rapid societal changes such as Brexit and the polarization of the US American society in the course of Donald Trump's election campaign. \n    </blockquote>\n    <footer>\n    <div class=\"author\"><a href=\"https://bpspsychub.onlinelibrary.wiley.com/doi/full/10.1111/bjso.12286\">Daniel Geschke, Jan Lorenz, Peter Holtz</a></div>\n    <div class=\"source\">The triple-filter bubble: Using agent-based modelling to test a meta-theoretical framework for the emergence of filter bubbles and echo chambers</div>\n</footer>\n</div>\n<p>A filter bubble – a term coined by Internet activist <a href=\"https://www.elipariser.org/\">Eli Pariser</a> creates a state of intellectual isolation having as a potential source personalized searches and filtering algorithms. It's also important to notice that filter bubble is not only a digital occurrence, your close and work circle also act as a filter bubble. Events, as the unexpected election outcome of 2016 sparked the interest in the subject and the role it might have then played.</p>\n<div class=\"quote\">\n    <blockquote>\nA phenomenon in which a person is exposed to ideas, people, facts, or news that adhere to or are consistent with a particular political or social ideology.\n</blockquote>\n<footer>\n    <div class=\"author\"><a href=\"https://medium.com/@nicklum/the-surprising-difference-between-filter-bubble-and-echo-chamber-b909ef2542cc\">Nick Lum</a></div>\n    <div class=\"source\">The Surprising Difference Between “Filter Bubble” and “Echo Chamber</div>\n</footer>\n</div>\n<div class=\"img-source\">\n    <img alt=\"Terms denotation\" src=\"./graphic.svg\"></img>\n    <div class=\"source\">Source <a href=\"https://medium.com/@nicklum/the-surprising-difference-between-filter-bubble-and-echo-chamber-b909ef2542cc\">Nick Lum</a></div>\n</div>\n<p>Notice how two terms sharing the same denotation are actually used and perceived. Filter bubble being best suited for self-introspection, and echo chamber, viewed as a pejorative term to define the behavior of others.</p>\n<div class=\"quote\">\n    <blockquote>\nA clear majority of Americans (62%) say social-media giants like Facebook have too much control over the news people see on their platforms.\n    </blockquote>\n    <footer>\n    <div class=\"author\"><a href=\"https://www.pewresearch.org/fact-tank/2018/03/27/americans-complicated-feelings-about-social-media-in-an-era-of-privacy-concerns/\">Pew Research Center</a></div>\n    <div class=\"source\">Americans’ complicated feelings about social media in an era of privacy concerns</div>\n</footer>\n</div>\n<h2 id=\"birds-of-a-feather-flock-together\">Birds of a feather flock together</h2>\n<p>When talking about tools and technologies we have to distinguish and take into consideration the biological nature of the user. This doesn't mean that as Humans we are inertly flawed and nothing can be done against it. But if natural biases show to be a factor in certain behaviors that can lead to dramatic outcomes. Being aware of them during the conception of online platforms or tools is important. Maybe part of the responsibilities should fall onto the user as well as the maker.  </p>\n<p>Blaming the individual, i.e., the user, on a lack of critical thinking alone is not sufficient and counterproductive. It also protects companies from undertaking fundamental changes on how their platforms operate, let alone other <a href=\"https://themarkup.org/\">dubious activities</a>. If even Big Tech doesn't have the best interest of their users in mind, we can't put the burden on the user to self regulate. An algorithm can be put in place or modified to counter self-isolation behaviors and increase the mixing between groups and ideologies.</p>\n<div class=\"quote\">\n  <blockquote>\n    Simulations show that, even without any social or technological filters, echo chambers emerge as a consequence of cognitive mechanisms, such as confirmation bias. [...] Most information filtering is the result of homophily, in the sense that Facebook users have significantly more friends with a political orientation similar to their own.\n  </blockquote>\n  <footer>\n    <div class=\"author\"><a href=\"https://bpspsychub.onlinelibrary.wiley.com/doi/full/10.1111/bjso.12286\">Daniel Geschke, Jan Lorenz, Peter Holtz</a></div>\n    <div class=\"source\">The triple-filter bubble: Using agent-based modelling to test a meta-theoretical framework for the emergence of filter bubbles and echo chambers </div>\n  </footer>\n</div>\n<h2 id=\"people-in-boxes\">People in boxes</h2>\n<p>We can't reduce behavior to a binary form but we can categorize them and create an approximation. For the user research phase rather than using age, nationality, sex as a highlighting factor I opted for creating three main categories of interviewed people. Each reflecting a level of expertise on algorithms and usage of technologies. The first pass of interviews constituted a set of basic questions that allowed me to better understand the way people react to a different set of situations. <em>(ex: their usage of social media, reactions, and behavior towards certain content and groups.)</em> Quickly, patterns emerged. </p>\n<p>Notice that the nature of this sample may be flawed. As the first category was not reachable online, it reduced greatly my opportunities for interaction. Also, this sample is skewed by the fact that I relied mainly on <strong>Discord</strong> to contact people. I used a casual approach by joining the server at random and started talking to people via text and voice chat.</p>\n<h3 id=\"i-the-outsider\">I. The outsider</h3>\n<p>This category can be described as having a high distrust of the Internet and technology in general. They praise and consider traditional media, by nature more reliable and depend mainly on them to get information. A certain disdain for new technologies was noticeable in some, but also admiration and pride in the technological advance of mankind.</p>\n<p>The conversation quickly became stale on the subject of algorithm, \"too fuzzy to even get the outline\" as one remarked. So I decided to steer the conversation toward  familiar concepts, talking about the way they get news, the relationship between those methods. A majority felt fatalistic and powerless on the state of the world, admitting that they stayed passive toward the inflow of information they receive daily. Maybe social networks, on an individual scale give us the illusion of being able to reach and having an impact, as much as the Internet impact the world.</p>\n<div class=\"quote\">\n  <blockquote>I hear how much technology is liberating and useful. In the end, I wonder if your generation is really that free compared to ours.\n  </blockquote>\n</div>\n<h4 id=\"the-gatekeeper-has-retired\">The gatekeeper has retired</h4>\n<p>Although this category is not, or quite unfamiliar with the Internet and by extension social media, a parallel between traditional media could be made and used as a common ground. While discussing this subject, the topic of the gatekeeper emerged.</p>\n<div class=\"quote\">\n  <blockquote>I have no hypothesis on how the algorithm works, for me, it means nothing.\n  </blockquote>\n</div>\n<p>Questions on who decides what to be shown, when, and to whom were a way to assess their perception of those media. This was useful for explaining that filtering algorithms were similar on the Internet, at a greater scale, as anyone can create content and share it.</p>\n<p>The main issue with traditional gatekeepers and digital ones is that, for the former, it was the role of the editor to curate content, now the role was passed to algorithms… Current social media might not have the same sense of ethics or none at all. We might need a journalist ethic equivalent for algorithms.</p>\n<h3 id=\"ii-the-regular\">II. The regular</h3>\n<p>This second category groups a wide range of users. From people with basic computer literacy to advanced usage. They often adopt a cynical point of view with a sense of impending doom and an undertone of general despair. They get the idea of an algorithm and the inner working of the systems.</p>\n<div class=\"quote\">\n  <blockquote>We are products, nothing is going to change\n  </blockquote>\n</div>\n<p>The ethic on social platforms is often reduced as \"as long as it doesn't infringe the rules\", but is felt as \"as long as it doesn't compromise the money-making process\". A recent scandal like the \"Cambridge Analytica\" revealed the deep flaws of these platforms. The belief that content will auto-regulate itself. Platforms didn't deem moderation as needed or even important, not caring if fake news is being openly broadcasted through their network.</p>\n<h4 id=\"silently-lurking\">Silently lurking</h4>\n<p>They often described themselves more often in a \"lurking\" phase, looking through content on their feed and alternating between active and passive behavior.</p>\n<div class=\"quote\">\n  <blockquote>I used to react in the debates but I've become demotivated because it is an endless fight. Now, I flag extreme right posts for my own pleasure.\n  </blockquote>\n</div>\n<p>The awareness of fact-checking is disparate for this category. Ranging from being able to tell from fake news, link bait, to being gullible toward consumed content. A certain naivety displayed by the belief that everything showed online can be deemed legit.</p>\n<div class=\"quote\">\n  <blockquote>As a Youtube user, I see a lot of video describing the application's algorithm. So I'm kind of aware of it, but I couldn't tell you precisely how it works.\n  </blockquote>\n</div>\n<p>The user of platforms is not equal to algorithm awareness. A majority of Youtube users showed a deeper understanding of how those platforms operate. The subject of politics came rather quickly. Users were able to attach political tendencies to certain platforms, although this thought tendency contradicted and shifted a lot between interviews.</p>\n<div class=\"quote\">\n  <blockquote>Twitter's community has more of a binary standpoint on politics. You tend to consult profiles and switch from posts to posts, so you quickly come across things that you don't like as much. I mostly encounter extreme right posts on Twitter contrary to Facebook, It's a network that often takes me out of my comfort zone.\n  </blockquote>\n</div>\n<h3 id=\"iii-the-whiz\">III. The whiz</h3>\n<p>This last category is often opinionated on the subject, and very aware of the system at work. They also display a deeper understanding of the whole technological aspect. Note that the nature of their profession is often linked to the tech world. The general mood of this category was a delusional feeling toward the current state of the world. This is also reflected in their behavior, arguing online is often viewed as a waste of time.</p>\n<div class=\"quote\">\n  <blockquote>\n    When I see something opposed to my view I usually shrug it off, don't care enough to the point where i start arguing with someone online.\n  </blockquote>\n</div>\n<div class=\"quote\">\n  <blockquote>I have created a private discord server that mirrors everything I follow into separate channels across different platforms so I only have to check this one place to see what's going on instead of keeping up with 10+ websites that same way. I go behind any algorithm's back.\n  </blockquote>\n</div>\n<div class=\"img-source\">\n    <img alt=\"Red pill\" src=\"./red_pill.jpeg\"></img>\n    <div class=\"source\">Source <a href=\"https://www.wired.com/story/alt-tech-social-media/\">Matt Panuska, Emma Grey Ellis</a></div>\n</div>\n<h2 id=\"online-tribalism-and-the-mainstreaming-of-extreme-ideologies\">Online Tribalism and the mainstreaming of extreme ideologies</h2>\n<p>It would be ridiculous to assume that this issue <a href=\"https://www.youtube.com/watch?v=xwA4k0E51Oo\">concern online newsfeed only</a>. Maybe this can be deemed as too dramatic, but the state of the open web is undermined. There is always been the presence of a <a href=\"https://www.wired.com/story/alt-tech-social-media/\">fringe culture on the Internet</a>, but now it's creeping into regular users joining services reserved for a certain ideology. Composed of the equivalent of a certain country's demography. This tendency amplifies division between Internet users, as a technology that was hoped to gather is now dividing. This causes extremism to form and thrive on custom platforms.</p>\n<div class=\"quote\">\n  <blockquote>\n    We spent three months undercover doing ethnographic research in previously unexplored forums, and analysed over 5,000 pieces of content gathered from across more than 50 different platforms. \n  </blockquote>\n  <footer>\n    <div class=\"author\"><a href=\"https://www.isdglobal.org/wp-content/uploads/2018/10/The-Fringe-Insurgency-090819.pdf\">Jacob Davey, Julia Ebner </a></div>\n    <div class=\"source\">The Fringe Insurgency Connectivity, Convergence and Mainstreaming of the Extreme Right\n</div>\n  </footer>\n</div>\n<p>For almost 10 years Facebook gave itself the mission to connect the entire world. What happens when a company with private interest becomes the prime news feed of millions of people? Thus, taking the place of the open web for a majority of its user base.</p>\n<p>We are now attending a big witch hunt, thinking that if extremism is chased out of popular networks it will cease to exist. The reality is that the outcast will just find or build other platforms to share and communicate ideas. What's more dangerous is that by doing so the division is exacerbated even more. Creating resentment and putting aside dialogue is never a good idea.</p>\n<p>What's no longer seen might just be hidden from view.</p>","metadata":{},"filename":"writing.md","path":"/home/tibo/Documents/head/Making Sense of Algorithms/essay/src/writing.md"};

    /* src/App.svelte generated by Svelte v3.31.2 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let header;
    	let t0;
    	let main;
    	let raw_value = writing.html + "";
    	let t1;
    	let footer;

    	const block = {
    		c: function create() {
    			header = element("header");
    			t0 = space();
    			main = element("main");
    			t1 = space();
    			footer = element("footer");
    			attr_dev(header, "class", "svelte-1dkz46h");
    			add_location(header, file, 3, 0, 55);
    			attr_dev(main, "class", "svelte-1dkz46h");
    			add_location(main, file, 5, 0, 74);
    			attr_dev(footer, "class", "svelte-1dkz46h");
    			add_location(footer, file, 8, 0, 111);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			main.innerHTML = raw_value;
    			insert_dev(target, t1, anchor);
    			insert_dev(target, footer, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ writing });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
