import type { Lesson } from "../types";

export const cssProfessionalLesson: Lesson = {
  id: "css-professional",
  title: "Professional CSS",
  topics: [
    {
      id: "css-professional-transitions",
      title: "CSS Transitions",
      explanation: "Imagine a light switch that instantly snaps between on and off. Now imagine a dimmer switch that smoothly fades the light up or down. CSS transitions are your dimmer switch — they let property changes glide from one value to another over a period of time instead of jumping abruptly.\n\nA transition needs four pieces of information: which property to animate, how long the animation should take, what kind of speed curve to use, and how long to wait before starting. The shorthand property `transition` lets you set all of these at once: `transition: background-color 0.3s ease 0s;`.\n\nThe `transition-duration` controls timing. A value of `0.3s` feels snappy and modern for hover effects; `1s` feels slow and deliberate. You can use seconds (`s`) or milliseconds (`ms`). The `transition-timing-function` shapes the velocity curve. `ease` starts fast and slows down, `linear` keeps a constant pace, `ease-in` starts slow, `ease-out` ends slow, and `ease-in-out` does both. There is also the powerful `cubic-bezier()` function for fully custom curves.\n\nTransitions are triggered by a state change — most commonly the `:hover` pseudo-class, but also `:focus`, `:active`, or a JavaScript-added class. You define the transition on the element itself (not on the `:hover` rule), so the animation plays both when entering and leaving the state.\n\nYou can animate multiple properties by separating them with commas: `transition: color 0.2s ease, transform 0.4s ease-out;`. Or use the shortcut `transition: all 0.3s ease;` to transition every changing property, though this is less performant because the browser must watch every property.\n\nNot every CSS property can be transitioned. Only properties with numeric or color intermediate values work — things like `opacity`, `color`, `background-color`, `width`, `height`, `padding`, `margin`, `border-radius`, and `transform`. Properties like `display` cannot be transitioned because there is no meaningful in-between value between `block` and `none`.\n\nFrom a performance standpoint, the two best properties to animate are `opacity` and `transform`. These can be handled entirely by the GPU without causing the browser to recalculate layout, which means buttery-smooth 60fps animations even on mobile devices. Animating `width` or `height` forces layout recalculations and can cause jank.\n\nTransitions are the bread and butter of interactive web design. Buttons that change color, cards that lift on hover, navigation links that underline smoothly — all of these small moments of delight come from well-chosen transitions. Master them and your pages will feel polished and professional from day one.",
      htmlExample: `<button class="btn">Hover Over Me</button>
<a href="#" class="link">A Smooth Link</a>
<div class="card">
  <h2>Hover the Card</h2>
  <p>Watch the shadow grow.</p>
</div>`,
      cssExample: `body {
  font-family: sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}

.btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.link {
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  margin: 1rem 0;
  transition: color 0.2s ease;
}

.link:hover {
  color: #1d4ed8;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(-4px);
}`,
      exercises: [
        {
          title: "Slow-Motion Color Fade",
          description: "Change the button's transition duration to 1.5s and switch the timing function to 'linear'. Observe how the feel of the interaction changes compared to the snappy 0.3s ease version.",
          hint: "Update the transition property on .btn: transition: background-color 1.5s linear, transform 1.5s linear;"
        },
        {
          title: "Opacity Fade on Hover",
          description: "Add a new element with class 'fade-box' styled as a colored square (150px by 150px). Make it fade to 50% opacity when hovered using a CSS transition.",
          hint: "Set opacity: 1 on .fade-box and transition: opacity 0.4s ease, then set opacity: 0.5 on .fade-box:hover"
        }
      ],
      quiz: [
        {
          question: "Which CSS property is used to specify how long a transition takes to complete?",
          options: ["transition-speed", "transition-duration", "transition-time", "animation-duration"],
          correctIndex: 1,
          explanation: "transition-duration sets the length of time a transition animation should take to complete, using seconds (s) or milliseconds (ms)."
        },
        {
          question: "Where should the `transition` property be placed to ensure the animation plays both when entering AND leaving a hover state?",
          options: ["On the :hover rule only", "On the base element selector", "On both the element and :hover rule", "Inside a @keyframes block"],
          correctIndex: 1,
          explanation: "Placing the transition on the base element selector ensures it applies in both directions — when the state changes in and when it changes back out."
        },
        {
          question: "Which timing function keeps a constant speed throughout the animation?",
          options: ["ease", "ease-in-out", "linear", "ease-out"],
          correctIndex: 2,
          explanation: "linear maintains the same velocity from start to finish, unlike ease variants which accelerate or decelerate."
        },
        {
          question: "Which two CSS properties are most GPU-friendly to animate?",
          options: ["width and height", "color and font-size", "opacity and transform", "margin and padding"],
          correctIndex: 2,
          explanation: "opacity and transform can be composited by the GPU without triggering layout recalculations, making them the most performant properties to animate."
        },
        {
          question: "What does `transition: all 0.3s ease;` do?",
          options: ["Animates only color properties", "Animates every property that changes", "Animates only transform and opacity", "Disables all transitions"],
          correctIndex: 1,
          explanation: "Using 'all' as the property value tells the browser to transition every CSS property that changes, though this is less performant than naming specific properties."
        },
        {
          question: "Which CSS property CANNOT be smoothly transitioned because it lacks numeric intermediate values?",
          options: ["opacity", "display", "border-radius", "transform"],
          correctIndex: 1,
          explanation: "display has discrete keyword values like 'block' and 'none' with no meaningful in-between state, so it cannot be transitioned smoothly."
        },
        {
          question: "What is the correct shorthand order for the transition property?",
          options: ["duration property timing-function delay", "property duration timing-function delay", "delay property duration timing-function", "property timing-function delay duration"],
          correctIndex: 1,
          explanation: "The correct order is: property, duration, timing-function, delay — for example: transition: color 0.3s ease 0s;"
        },
        {
          question: "How do you animate two properties with different durations using the transition shorthand?",
          options: ["transition: color 0.2s, transform 0.4s;", "transition: [color 0.2s] [transform 0.4s];", "transition: color=0.2s transform=0.4s;", "transition: multi color 0.2s transform 0.4s;"],
          correctIndex: 0,
          explanation: "Multiple transitions are separated by commas, each with their own property name and duration."
        },
        {
          question: "A button has `transition: background-color 0.5s ease;` on it. What happens when the user stops hovering?",
          options: ["The color snaps back instantly", "The color transitions back over 0.5s", "Nothing changes", "The element disappears"],
          correctIndex: 1,
          explanation: "Because the transition is on the base element, it applies in both directions — the animation plays forward when hovering and in reverse when the hover ends."
        },
        {
          question: "What does `transition-delay: 0.2s` do?",
          options: ["Makes the transition last 0.2s longer", "Waits 0.2s before starting the transition", "Speeds up the transition by 0.2s", "Repeats the transition after 0.2s"],
          correctIndex: 1,
          explanation: "transition-delay specifies a waiting period before the transition begins, useful for staggering multiple animations."
        },
        {
          question: "Which transition timing function starts slow, speeds up, then slows down again?",
          options: ["ease-in", "ease-out", "ease-in-out", "linear"],
          correctIndex: 2,
          explanation: "ease-in-out begins slowly, accelerates through the middle, and then decelerates at the end, giving a natural feel."
        },
        {
          question: "What unit is NOT valid for transition-duration?",
          options: ["0.3s", "300ms", "0.3", "1s"],
          correctIndex: 2,
          explanation: "A bare number like 0.3 without a unit is invalid for transition-duration; you must specify s (seconds) or ms (milliseconds)."
        },
        {
          question: "Spot the bug: `.card:hover { transition: transform 0.3s ease; transform: scale(1.05); }` — the transition does not animate smoothly on hover.",
          options: ["transform should be scale(2)", "The transition should be on .card, not .card:hover", "ease should be linear", "scale() is not a valid transform"],
          correctIndex: 1,
          explanation: "Defining the transition only on :hover means it animates in but snaps back instantly. Move the transition to the base .card selector."
        },
        {
          question: "Which property would you animate to make an element fade out without removing it from the layout?",
          options: ["display", "visibility", "opacity", "z-index"],
          correctIndex: 2,
          explanation: "opacity can be transitioned smoothly from 1 to 0; the element remains in the document flow unlike display:none."
        },
        {
          question: "What does `transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);` achieve?",
          options: ["A perfectly linear motion", "A bouncy overshoot effect", "A very slow fade", "No animation at all"],
          correctIndex: 1,
          explanation: "This particular cubic-bezier curve creates a spring/bounce effect where the element slightly overshoots its target before settling."
        },
        {
          question: "An element has `transition: opacity 0.3s ease;`. You change its class with JavaScript. What triggers the transition?",
          options: ["Only :hover triggers transitions", "The class change triggers the transition if opacity changes", "JavaScript cannot trigger CSS transitions", "You must use animation instead"],
          correctIndex: 1,
          explanation: "CSS transitions fire whenever the specified property changes value, regardless of whether the change was caused by a pseudo-class or JavaScript."
        },
        {
          question: "Which statement about `transition: all 0.3s ease;` is true?",
          options: ["It is the most performant way to write transitions", "It is convenient but less performant than specifying individual properties", "It only works on color and opacity", "It is required for transforms to work"],
          correctIndex: 1,
          explanation: "Using 'all' is convenient for quick prototyping but forces the browser to watch every property for changes, which can hurt performance."
        },
        {
          question: "What is the default value of transition-delay?",
          options: ["0.5s", "1s", "0s", "auto"],
          correctIndex: 2,
          explanation: "By default, transition-delay is 0s, meaning the transition starts immediately when the property value changes."
        },
        {
          question: "Which combination will produce a visible transition effect on link hover?",
          options: [
            "a { transition: color 0s; } a:hover { color: red; }",
            "a { color: blue; transition: color 0.3s ease; } a:hover { color: red; }",
            "a:hover { transition: color 0.3s ease; color: red; }",
            "a { transition: display 0.3s; } a:hover { display: none; }"
          ],
          correctIndex: 1,
          explanation: "The transition must be on the base element with a non-zero duration, and the property must actually change value on hover."
        },
        {
          question: "Why is animating `width` considered worse for performance than animating `transform: scaleX()`?",
          options: ["width uses more bytes of CSS", "Changing width triggers layout recalculation, while transform uses the GPU", "transform is a newer property", "width cannot be animated at all"],
          correctIndex: 1,
          explanation: "Changing width causes the browser to recalculate layout for the element and potentially its neighbors, while transform is handled by the compositor thread without layout recalculation."
        }
      ]
    },
    {
      id: "css-professional-animations-keyframes",
      title: "CSS Animations and Keyframes",
      explanation: "CSS transitions are great when you want to animate from one state to another triggered by a user action. But what if you want an animation that plays automatically, loops, or passes through multiple states? That is where CSS animations and `@keyframes` come in.\n\nThink of a `@keyframes` block as a storyboard for a movie. Each keyframe is a scene describing what the element looks like at a specific moment. You give your storyboard a name, then attach it to an element using the `animation` property. The browser figures out all the frames in between automatically.\n\nHere is a simple example. First, define the keyframes:\n\n```\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n```\n\nThen apply it: `animation: fadeIn 1s ease forwards;`. The `from` keyword is the same as `0%` and `to` is the same as `100%`. You can add as many percentage stops as you like for complex multi-stage animations.\n\nThe `animation` shorthand packs in several sub-properties. `animation-name` references the keyframes block. `animation-duration` sets how long one cycle lasts. `animation-timing-function` works exactly like in transitions. `animation-delay` waits before starting. `animation-iteration-count` sets how many times it plays — use `infinite` for endless loops. `animation-direction` can be `normal`, `reverse`, `alternate` (ping-pong forward and back), or `alternate-reverse`. `animation-fill-mode` controls what happens before and after the animation: `forwards` holds the final state, `backwards` applies the first keyframe during the delay, `both` does both.\n\nYou can attach multiple animations to one element by separating them with commas, just like transitions. Each animation can have completely different names, durations, and timing functions.\n\nA practical use case is a loading spinner: rotate an element continuously using `@keyframes spin { to { transform: rotate(360deg); } }` with `animation: spin 1s linear infinite;`. Another is a pulsing badge: scale up and down repeatedly using `alternate` direction.\n\nOne key difference from transitions: animations run automatically when the element appears in the DOM (or after their delay), without requiring user interaction. This makes them perfect for entrance animations, loading states, and ambient effects.\n\nFor accessibility, users can set their operating system to reduce motion. Always respect this preference using the `@media (prefers-reduced-motion: reduce)` media query, and either remove or simplify animations for those users. This is both considerate and increasingly expected in professional code.",
      htmlExample: `<div class="loader"></div>
<div class="pulse-badge">NEW</div>
<h1 class="fade-in-title">Welcome!</h1>`,
      cssExample: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: #1e1e2e;
  color: white;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255,255,255,0.2);
  border-top-color: #a78bfa;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.pulse-badge {
  background: #f59e0b;
  color: #1e1e2e;
  font-weight: bold;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  animation: pulse 1.5s ease-in-out infinite;
}

.fade-in-title {
  animation: fadeSlideIn 0.8s ease forwards;
}`,
      exercises: [
        {
          title: "Build a Bouncing Dot",
          description: "Create a small circle (40px) that bounces up and down continuously. Define a @keyframes block that moves the element up by 30px at 50% and back to its original position at 100%. Use animation-direction: alternate or adjust keyframes so the motion loops smoothly.",
          hint: "Try @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } } and animation: bounce 0.6s ease-in-out infinite;"
        },
        {
          title: "Entrance Animation with Delay",
          description: "Create three paragraphs that each slide in from the left one after the other, with a 0.2s delay between each. Use a single @keyframes rule and apply different animation-delay values to each paragraph.",
          hint: "Define @keyframes slideIn { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } } then give p:nth-child(1) delay 0s, p:nth-child(2) delay 0.2s, p:nth-child(3) delay 0.4s"
        }
      ],
      quiz: [
        {
          question: "What is the CSS rule that defines the stages of a CSS animation?",
          options: ["@transition", "@keyframes", "@animation", "@stages"],
          correctIndex: 1,
          explanation: "@keyframes is the at-rule used to define the intermediate steps (keyframes) of a CSS animation sequence."
        },
        {
          question: "What is the equivalent keyword to '0%' in a @keyframes block?",
          options: ["start", "begin", "from", "initial"],
          correctIndex: 2,
          explanation: "The 'from' keyword is an alias for 0% in a @keyframes block, representing the starting state."
        },
        {
          question: "Which animation-fill-mode value makes the element hold its final animated state after the animation ends?",
          options: ["backwards", "none", "forwards", "both"],
          correctIndex: 2,
          explanation: "animation-fill-mode: forwards causes the element to retain the styles from the last keyframe after the animation completes."
        },
        {
          question: "How do you make a CSS animation loop forever?",
          options: ["animation-iteration-count: infinite", "animation-loop: true", "animation-repeat: forever", "animation-count: loop"],
          correctIndex: 0,
          explanation: "Setting animation-iteration-count to the keyword 'infinite' causes the animation to repeat endlessly."
        },
        {
          question: "What does `animation-direction: alternate` do?",
          options: ["Plays the animation in reverse on every cycle", "Plays forward then backward alternating each cycle", "Randomizes the direction each time", "Skips even-numbered iterations"],
          correctIndex: 1,
          explanation: "alternate plays the animation forward on odd iterations and backward on even iterations, creating a smooth ping-pong effect."
        },
        {
          question: "Which property would you use to pause a running CSS animation?",
          options: ["animation-state: paused", "animation-play-state: paused", "animation-status: stopped", "animation-run: false"],
          correctIndex: 1,
          explanation: "animation-play-state accepts 'running' or 'paused' to control whether the animation is active or frozen."
        },
        {
          question: "A loading spinner uses `animation: spin 0.8s linear infinite`. What would happen if you changed 'linear' to 'ease'?",
          options: ["The spinner would stop", "The spinner would speed up then slow down each rotation, looking uneven", "The spinner would spin in reverse", "No visible change would occur"],
          correctIndex: 1,
          explanation: "ease acceleration means each rotation would accelerate from slow to fast and back, making the spinner look jerky rather than smoothly continuous."
        },
        {
          question: "What is the correct syntax for attaching a @keyframes animation named 'fadeIn' for 1 second with ease timing?",
          options: ["animation: fadeIn ease 1s;", "animation: fadeIn 1s ease;", "animation: 1s fadeIn ease;", "animation-name: fadeIn; 1s ease;"],
          correctIndex: 1,
          explanation: "The animation shorthand order is: name, duration, timing-function (and optionally delay, iteration-count, direction, fill-mode)."
        },
        {
          question: "How do you apply two different animations to a single element?",
          options: ["Use two animation properties stacked", "Separate them with a semicolon inside one animation property", "Separate them with commas in the animation property", "Wrap the element in two divs each with one animation"],
          correctIndex: 2,
          explanation: "Multiple animations are comma-separated in the animation shorthand, each with its own name, duration, and settings."
        },
        {
          question: "Which @keyframes definition creates a smooth infinite rotation?",
          options: [
            "@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360); } }",
            "@keyframes spin { to { transform: rotate(360deg); } }",
            "@keyframes spin { 100% { transform: rotateZ(360px); } }",
            "@keyframes spin { from { rotation: 0deg; } to { rotation: 360deg; } }"
          ],
          correctIndex: 1,
          explanation: "The shortest valid definition just needs a 'to' keyframe with rotate(360deg); browsers assume 'from' is the element's current state."
        },
        {
          question: "What does `animation-delay: -0.5s` do?",
          options: ["Causes an error", "Starts the animation 0.5s late", "Starts the animation 0.5s into the cycle immediately", "Reverses the animation"],
          correctIndex: 2,
          explanation: "A negative animation-delay causes the animation to begin already partway through its cycle, as if it had started 0.5s in the past."
        },
        {
          question: "Which media query should you use to respect user preferences for reduced motion?",
          options: [
            "@media (no-animation: true)",
            "@media (prefers-reduced-motion: reduce)",
            "@media (accessibility: reduce-motion)",
            "@media (motion: none)"
          ],
          correctIndex: 1,
          explanation: "@media (prefers-reduced-motion: reduce) detects the user's OS setting to minimize motion, allowing you to disable or simplify animations."
        },
        {
          question: "What happens if you define a @keyframes block but never reference it in an animation property?",
          options: ["It throws a CSS error", "It plays automatically on the body element", "Nothing happens; it is defined but unused", "It applies to all elements"],
          correctIndex: 2,
          explanation: "A @keyframes block is just a definition; it has no effect until you reference its name in an animation property on an element."
        },
        {
          question: "An animation has animation-iteration-count: 3 and animation-direction: alternate. How does the 2nd iteration play?",
          options: ["Forward", "Backward", "It is skipped", "It plays at half speed"],
          correctIndex: 1,
          explanation: "With alternate direction, odd iterations (1st, 3rd) play forward and even iterations (2nd) play backward."
        },
        {
          question: "Which value of animation-fill-mode applies the first keyframe's styles during the animation-delay period?",
          options: ["forwards", "none", "backwards", "both"],
          correctIndex: 2,
          explanation: "animation-fill-mode: backwards applies the from/0% keyframe styles to the element during its delay period before the animation starts."
        },
        {
          question: "Spot the bug: `@keyframes slide { from { transform: translateX(-100px) } to { transform: translateX(0px) } }` — the animation is defined but does not play.",
          options: ["translateX values need units like 'px'", "The animation property is not applied to any element", "from and to should be 0% and 100%", "There are missing semicolons inside keyframe rules"],
          correctIndex: 1,
          explanation: "The @keyframes block is correctly defined, but without an animation property referencing it on an element, it will never play."
        },
        {
          question: "What is the difference between CSS transitions and CSS animations?",
          options: [
            "Transitions support colors; animations only support transforms",
            "Transitions require a state change to trigger; animations can play automatically",
            "Animations use @keyframes; transitions use @stages",
            "There is no difference; they are the same feature"
          ],
          correctIndex: 1,
          explanation: "Transitions respond to state changes (like hover), while animations defined with @keyframes can start automatically when an element is rendered."
        },
        {
          question: "What does `animation-timing-function: steps(4, end)` do?",
          options: ["Plays the animation in 4 smooth eased steps", "Divides the animation into 4 discrete jumps with no interpolation between them", "Plays the animation 4 times", "Delays the animation by 4 steps"],
          correctIndex: 1,
          explanation: "The steps() timing function creates a stepping animation that jumps between discrete states, useful for sprite sheet animations."
        },
        {
          question: "Which property controls how many times an animation plays before stopping?",
          options: ["animation-repeat", "animation-count", "animation-iteration-count", "animation-cycles"],
          correctIndex: 2,
          explanation: "animation-iteration-count specifies the number of times an animation cycle should be played; it accepts a number or 'infinite'."
        },
        {
          question: "You want a text element to slide in from below when the page loads and stay in its final position. Which animation-fill-mode value should you use?",
          options: ["backwards", "none", "both", "forwards"],
          correctIndex: 3,
          explanation: "animation-fill-mode: forwards retains the final keyframe state after the animation ends, keeping the element in its slid-in position."
        }
      ]
    },
    {
      id: "css-professional-transforms",
      title: "CSS Transforms (2D and 3D)",
      explanation: "CSS transforms let you visually move, rotate, scale, and skew elements without disturbing the document flow around them. Think of it like using Photoshop to reposition a layer — the surrounding content does not reflow because the transform happens in a separate compositing step.\n\nThe `transform` property accepts one or more transform functions as its value. The most used 2D transforms are: `translate(x, y)` which moves an element, `rotate(angle)` which spins it around its center, `scale(x, y)` which resizes it, and `skew(xAngle, yAngle)` which shears it at an angle. You can chain multiple functions: `transform: translateX(-50%) rotate(45deg) scale(1.2);`.\n\nThe `transform-origin` property sets the anchor point for transforms. By default it is the center of the element (`50% 50%`). Change it to `top left` and a rotation will pivot from the corner instead. This is crucial for effects like card flips, spinning icons, or collapsing menus.\n\nFor 3D transforms, you unlock a whole new axis. `rotateX(deg)` tilts forward and back like opening a laptop. `rotateY(deg)` spins left and right like a revolving door. `rotateZ(deg)` is the same as the 2D `rotate()`. `translateZ(pz)` moves toward or away from the viewer.\n\nTo actually see 3D effects, the parent element must have `perspective` set. Perspective controls how dramatic the 3D effect looks — a small value like `200px` creates an extreme fish-eye effect, while `1000px` is subtle. You set it on the parent container: `perspective: 800px;`.\n\nThe `transform-style: preserve-3d` property on a container tells its children to live in the same 3D space, which is required for card-flip effects where both front and back of a card need to coexist in 3D. The `backface-visibility: hidden` property hides an element when it is rotated to face away from the viewer, making card flips look clean.\n\nA common trick is centering an absolutely-positioned element: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`. Because `top/left` percentages are relative to the parent but `translate` percentages are relative to the element itself, this perfectly centers anything regardless of its size.\n\nTransforms compose from right to left when chained — the rightmost function is applied first. This is important to understand when combining translate and rotate, as the order changes the result.",
      htmlExample: `<div class="scene">
  <div class="card-3d">
    <div class="card-face card-front">Front</div>
    <div class="card-face card-back">Back</div>
  </div>
</div>
<div class="badge-skew">SALE</div>`,
      cssExample: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem;
  background: #0f172a;
  color: white;
}

.scene {
  perspective: 600px;
}

.card-3d {
  width: 200px;
  height: 130px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  cursor: pointer;
}

.card-3d:hover {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 10px;
  backface-visibility: hidden;
}

.card-front {
  background: #6366f1;
}

.card-back {
  background: #ec4899;
  transform: rotateY(180deg);
}

.badge-skew {
  background: #facc15;
  color: #0f172a;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  transform: skewX(-10deg);
  letter-spacing: 0.1em;
}`,
      exercises: [
        {
          title: "Rotating Icon on Hover",
          description: "Create a div with a simple emoji or text inside it. On hover, rotate the element 180 degrees and scale it to 1.2x size. Use a CSS transition so the transform animates smoothly.",
          hint: "Add transform: rotate(180deg) scale(1.2) to the :hover state and transition: transform 0.4s ease to the base element."
        },
        {
          title: "Custom Transform Origin",
          description: "Create a rectangle that rotates 45 degrees on hover, but pivots from its top-left corner instead of the center. Experiment with different transform-origin values.",
          hint: "Set transform-origin: top left on the element, then add transform: rotate(45deg) on :hover."
        }
      ],
      quiz: [
        {
          question: "Which CSS property applies visual transformations like rotation, scaling, and movement?",
          options: ["filter", "animation", "transform", "position"],
          correctIndex: 2,
          explanation: "The transform property accepts transform functions like rotate(), scale(), and translate() to visually modify elements."
        },
        {
          question: "What does `transform: translate(-50%, -50%)` do when used with `top: 50%; left: 50%` on an absolutely positioned element?",
          options: ["Moves the element off screen", "Centers the element perfectly within its parent", "Scales the element to half size", "Rotates the element 50 degrees"],
          correctIndex: 1,
          explanation: "translate percentages are relative to the element's own size, so -50% pulls it back by half its width and height, achieving perfect centering."
        },
        {
          question: "Which transform function moves an element along the X axis only?",
          options: ["moveX()", "shiftX()", "translateX()", "positionX()"],
          correctIndex: 2,
          explanation: "translateX() moves an element horizontally along the X axis; positive values move right, negative move left."
        },
        {
          question: "What CSS property must be set on a parent container to enable visible 3D perspective effects on its children?",
          options: ["transform-style: preserve-3d", "perspective on the parent", "depth: 3d", "z-index: deep"],
          correctIndex: 1,
          explanation: "Setting perspective on the parent container establishes a 3D rendering context for its children, controlling the depth illusion."
        },
        {
          question: "What does `backface-visibility: hidden` do?",
          options: ["Hides the element completely", "Hides the back face of an element when it is rotated away from the viewer", "Makes the background transparent", "Prevents 3D transforms"],
          correctIndex: 1,
          explanation: "backface-visibility: hidden ensures an element is invisible when it has been rotated so its back is facing the viewer, essential for card flip effects."
        },
        {
          question: "By default, what is the transform-origin of an element?",
          options: ["top left (0% 0%)", "bottom center", "center center (50% 50%)", "top center"],
          correctIndex: 2,
          explanation: "The default transform-origin is 50% 50%, which is the center of the element, meaning rotations and scales happen around the middle."
        },
        {
          question: "What is the correct property for making children of a container share the same 3D space?",
          options: ["perspective: shared", "transform-style: preserve-3d", "3d-context: inherit", "depth: shared"],
          correctIndex: 1,
          explanation: "transform-style: preserve-3d on a container makes its children exist in the same 3D space rather than being flattened."
        },
        {
          question: "What does `transform: scale(2)` do?",
          options: ["Doubles the element's font size", "Moves the element 2px", "Makes the element appear twice as large visually", "Sets z-index to 2"],
          correctIndex: 2,
          explanation: "scale(2) makes the element appear twice as wide and twice as tall, but does not change its actual layout size in the document flow."
        },
        {
          question: "Which transform function tilts an element at an angle, making it look like italicized text?",
          options: ["rotate()", "tilt()", "skew()", "shear()"],
          correctIndex: 2,
          explanation: "skew() distorts the element along one or both axes, similar to the italic effect but applied geometrically."
        },
        {
          question: "You write `transform: translateX(20px) rotate(45deg)`. In what order are transforms applied?",
          options: ["Left to right: translate first, then rotate", "Right to left: rotate first, then translate", "They are applied simultaneously", "Alphabetical order"],
          correctIndex: 1,
          explanation: "Multiple transform functions are applied right to left, so rotate(45deg) is applied first, then the result is translated 20px along the (now rotated) X axis."
        },
        {
          question: "What does `transform: rotateY(180deg)` do?",
          options: ["Flips the element upside down", "Spins the element around the vertical Y axis, showing its back", "Rotates the element clockwise 180 degrees in 2D", "Moves the element 180px along Y"],
          correctIndex: 1,
          explanation: "rotateY(180deg) rotates the element around its vertical axis, like flipping a playing card face-down."
        },
        {
          question: "Which 3D transform function moves an element closer to or farther from the viewer?",
          options: ["translateZ()", "translateDepth()", "moveZ()", "scaleDepth()"],
          correctIndex: 0,
          explanation: "translateZ() moves an element along the Z axis — positive values bring it toward the viewer, negative push it away."
        },
        {
          question: "Does applying `transform: translate(100px, 50px)` affect surrounding elements in the layout?",
          options: ["Yes, it pushes neighboring elements away", "No, transforms do not affect the document flow", "Only if position is absolute", "Yes, but only in flex containers"],
          correctIndex: 1,
          explanation: "CSS transforms are applied after layout is calculated, so they do not affect the flow of surrounding elements."
        },
        {
          question: "What perspective value creates a more dramatic/extreme 3D effect?",
          options: ["1000px", "A larger number like 2000px", "A smaller number like 200px", "0px"],
          correctIndex: 2,
          explanation: "A small perspective value like 200px places the viewer very close to the 3D scene, creating exaggerated depth distortion."
        },
        {
          question: "Spot the bug: an element uses `transform: scale(1.1)` on hover but the neighboring elements shift when hovered.",
          options: ["scale() does not work on block elements", "The element needs position: absolute", "This is expected; scale() does affect layout", "This should not happen; transforms do not affect flow"],
          correctIndex: 3,
          explanation: "Transforms including scale do not affect the document flow, so neighboring elements should not shift. There may be another CSS property causing the movement."
        },
        {
          question: "What is `transform: scaleX(0)` useful for?",
          options: ["Hiding an element from view while keeping its space", "Rotating the element 90 degrees", "Stretching the element horizontally", "Making the element invisible without taking up space"],
          correctIndex: 0,
          explanation: "scaleX(0) collapses the element to zero width visually while maintaining its space in the layout, useful for expand/collapse animations."
        },
        {
          question: "Which property, when set on a parent, allows a card-flip animation to work correctly?",
          options: ["perspective and transform-style: preserve-3d", "overflow: visible", "position: relative", "z-index: 3d"],
          correctIndex: 0,
          explanation: "Both perspective (for the 3D illusion) and transform-style: preserve-3d (for children to share 3D space) are needed for a proper card-flip effect."
        },
        {
          question: "What will `transform: rotate(90deg)` look like?",
          options: ["The element is turned 90 degrees clockwise", "The element is flipped horizontally", "The element moves 90px to the right", "The element disappears"],
          correctIndex: 0,
          explanation: "rotate(90deg) turns the element 90 degrees clockwise around its transform-origin."
        },
        {
          question: "An element has `transform-origin: bottom center`. When `transform: rotate(45deg)` is applied, where does the rotation pivot?",
          options: ["The center of the element", "The top-left corner", "The bottom center edge", "The top-right corner"],
          correctIndex: 2,
          explanation: "transform-origin determines the anchor point for the transform, so setting it to bottom center makes the element rotate around its bottom middle edge."
        },
        {
          question: "Which statement is true about CSS transforms and accessibility?",
          options: ["Screen readers cannot read transformed elements", "Transforms only work with animations", "The DOM order and accessibility tree are unaffected by visual transforms", "Transforms change the tab order of elements"],
          correctIndex: 2,
          explanation: "CSS transforms are purely visual and do not change the underlying DOM structure, so screen readers and keyboard navigation are unaffected."
        }
      ]
    },
    {
      id: "css-professional-mobile-first",
      title: "Mobile-First Responsive Design Strategy",
      explanation: "In the early days of the web, most users browsed on desktop computers, so designers built for large screens first and occasionally added code to shrink things down for smaller devices. Today, more than half of all web traffic comes from mobile phones. Mobile-first design flips the script: you start with the smallest screen and progressively enhance for larger ones.\n\nThe core tool for responsive design is the CSS `@media` query. A media query wraps CSS rules in a condition, like: `@media (min-width: 768px) { ... }`. Rules inside this block only apply when the screen is at least 768px wide. Mobile-first means your base styles (outside any media query) target small screens, and you add media queries that kick in as the screen gets larger.\n\nContrast this with desktop-first, where you might write `@media (max-width: 768px)` to apply special rules for small screens. The problem is that you end up writing a lot of 'override' CSS to undo desktop styles on mobile. Mobile-first tends to produce cleaner, lighter code because you add complexity rather than undo it.\n\nCommon breakpoints are roughly: `480px` for large phones, `768px` for tablets, `1024px` for small laptops, and `1280px` for full desktops. Avoid using a framework's exact breakpoints as gospel — choose breakpoints where your actual content breaks and looks awkward.\n\nAlways include the viewport meta tag in your HTML: `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`. Without this, mobile browsers assume they are rendering a full desktop page and zoom out to fit, which defeats all your responsive CSS.\n\nFluid layouts complement breakpoints. Instead of fixed pixel widths, use percentages, `em`, `rem`, `vw`, `vh`, and `fr` units so elements naturally resize with the viewport. Combine this with CSS Flexbox and Grid to create layouts that rearrange themselves at different sizes.\n\nImages need special attention on mobile. Set `max-width: 100%` and `height: auto` on all images to prevent them from overflowing small containers. The HTML `srcset` attribute and the `<picture>` element let you serve different image files at different resolutions, saving bandwidth on mobile.\n\nThink about touch interaction too: buttons and links should be at least 44x44px in touch target size, form fields need enough padding to tap comfortably, and hover-only interactions must have touch-friendly alternatives. Mobile-first CSS combined with thoughtful content hierarchy creates websites that are fast, accessible, and pleasant on every screen.",
      htmlExample: `<header class="site-header">
  <h1>My App</h1>
  <nav class="main-nav">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Work</a>
    <a href="#">Contact</a>
  </nav>
</header>
<main class="content-grid">
  <article class="card">Card One</article>
  <article class="card">Card Two</article>
  <article class="card">Card Three</article>
</main>`,
      cssExample: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: sans-serif;
  padding: 1rem;
}

/* Mobile-first base styles */
.site-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #1e293b;
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.main-nav a {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  background: #334155;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.card {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  font-weight: bold;
}

/* Tablet and up */
@media (min-width: 768px) {
  .site-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}`,
      exercises: [
        {
          title: "Mobile Navigation Toggle",
          description: "Modify the navigation so that on mobile screens the links stack vertically in a single column, and on screens wider than 600px they display horizontally in a row. Use a min-width media query.",
          hint: "Set .main-nav { flex-direction: column; } as the base and override with @media (min-width: 600px) { .main-nav { flex-direction: row; } }"
        },
        {
          title: "Fluid Typography",
          description: "Set the base heading font-size to 1.5rem for mobile, then override it to 2.5rem for screens wider than 768px using a min-width media query. Also change the body padding from 1rem to 2rem on larger screens.",
          hint: "Write h1 { font-size: 1.5rem; } at base level, then inside @media (min-width: 768px) { h1 { font-size: 2.5rem; } body { padding: 2rem; } }"
        }
      ],
      quiz: [
        {
          question: "What does 'mobile-first' mean in CSS development?",
          options: ["Building only for mobile and ignoring desktop", "Writing base styles for small screens and adding complexity for larger screens", "Using a mobile framework like React Native", "Hiding all desktop styles on mobile"],
          correctIndex: 1,
          explanation: "Mobile-first means writing default styles targeted at small screens, then using min-width media queries to progressively enhance for larger screens."
        },
        {
          question: "Which type of media query is characteristic of a mobile-first approach?",
          options: ["@media (max-width: 768px)", "@media (min-width: 768px)", "@media (device: mobile)", "@media (screen: small)"],
          correctIndex: 1,
          explanation: "min-width queries add styles as the screen gets larger, which is the progressive enhancement approach of mobile-first design."
        },
        {
          question: "What is the purpose of `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`?",
          options: ["It loads CSS files on mobile", "It tells mobile browsers to use the device's actual width instead of assuming a desktop viewport", "It sets the page zoom level permanently", "It enables JavaScript on mobile"],
          correctIndex: 1,
          explanation: "Without the viewport meta tag, mobile browsers render pages at a virtual desktop width and zoom out, making responsive CSS ineffective."
        },
        {
          question: "Which CSS unit represents 1% of the viewport width?",
          options: ["vp", "%", "vw", "fr"],
          correctIndex: 2,
          explanation: "vw (viewport width) is a unit equal to 1% of the current viewport width, making it useful for fluid sizing that scales with the browser window."
        },
        {
          question: "Why is mobile-first considered cleaner than desktop-first code?",
          options: ["Mobile CSS loads faster", "You add styles for larger screens rather than overriding desktop styles for mobile", "Mobile browsers are more standards-compliant", "It requires fewer HTML elements"],
          correctIndex: 1,
          explanation: "Mobile-first progressively adds styles, resulting in less override CSS compared to desktop-first where you write and then undo complex styles for mobile."
        },
        {
          question: "What CSS should you apply to all images to prevent overflow on small screens?",
          options: ["img { width: 100vw; }", "img { max-width: 100%; height: auto; }", "img { display: block; width: auto; }", "img { overflow: hidden; }"],
          correctIndex: 1,
          explanation: "max-width: 100% prevents images from exceeding their container width, and height: auto maintains the aspect ratio."
        },
        {
          question: "A breakpoint is best defined as:",
          options: ["A CSS error that stops execution", "A screen width at which your layout changes to better suit the available space", "The maximum supported screen width", "An HTML attribute for responsive images"],
          correctIndex: 1,
          explanation: "A breakpoint is a viewport width threshold in a media query where you adjust the layout to accommodate the new screen size."
        },
        {
          question: "Which of these is a valid mobile-first CSS media query for tablets?",
          options: [
            "@media (tablet: true) { }",
            "@media screen and (min-width: 768px) { }",
            "@media (max-device-width: 768px) { }",
            "@media (size: tablet) { }"
          ],
          correctIndex: 1,
          explanation: "@media screen and (min-width: 768px) is valid CSS that applies styles when the screen is 768px or wider, a common tablet breakpoint."
        },
        {
          question: "What minimum touch target size is generally recommended for buttons and links on mobile?",
          options: ["20x20px", "30x30px", "44x44px", "60x60px"],
          correctIndex: 2,
          explanation: "A 44x44px touch target is the widely accepted minimum to ensure users can tap comfortably with a fingertip on touchscreens."
        },
        {
          question: "In a mobile-first stylesheet, where would you write your styles for the smallest screen?",
          options: ["Inside a @media (max-width: 480px) block", "Inside a @media (min-width: 480px) block", "Outside any media query, as the default styles", "In a separate mobile.css file"],
          correctIndex: 2,
          explanation: "Mobile-first default styles live outside any media query. Media queries then add enhancements as the screen grows larger."
        },
        {
          question: "Which CSS property allows a grid to automatically place items in the best fit for available space without explicit breakpoints?",
          options: ["grid-auto-fit", "grid-template-columns: auto", "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))", "grid-flexible: true"],
          correctIndex: 2,
          explanation: "Using repeat(auto-fit, minmax()) creates a self-adjusting grid that fits as many columns as possible without needing explicit breakpoints."
        },
        {
          question: "Spot the issue: a site looks great on desktop but on mobile everything is tiny and zoomed out, even though responsive CSS is in place.",
          options: ["The CSS uses rem units", "The viewport meta tag is missing from the HTML", "There are no media queries", "The CSS uses flexbox"],
          correctIndex: 1,
          explanation: "Without the viewport meta tag, mobile browsers simulate a wide desktop viewport and zoom out, ignoring responsive CSS intent."
        },
        {
          question: "What does `@media (min-width: 1024px) and (max-width: 1280px)` match?",
          options: ["Screens smaller than 1024px", "Screens between 1024px and 1280px wide", "Only exactly 1024px screens", "Screens larger than 1280px"],
          correctIndex: 1,
          explanation: "Using both min-width and max-width creates a range query that only applies styles to screens within that specific width range."
        },
        {
          question: "Which approach is generally recommended for handling hover effects on touch devices?",
          options: ["Remove hover effects entirely", "Keep hover effects; they work on touch automatically", "Make interactive states also respond to :focus and :active for keyboard and touch", "Use JavaScript only for hover effects"],
          correctIndex: 2,
          explanation: "Since touch devices do not reliably trigger :hover, using :focus and :active as well ensures interactive feedback works for all input types."
        },
        {
          question: "What is a 'fluid layout'?",
          options: ["A layout with animated transitions", "A layout using percentage-based widths that scale with the viewport", "A layout that uses only viewport units", "A fixed-width layout that scrolls horizontally"],
          correctIndex: 1,
          explanation: "A fluid layout uses relative units like percentages so elements proportionally resize with the available viewport width."
        },
        {
          question: "When should you add a breakpoint to your CSS?",
          options: ["At every 100px viewport width increment", "Only at standard industry breakpoints (320, 768, 1024)", "When your content looks awkward or breaks at a certain size", "After every 5 lines of CSS"],
          correctIndex: 2,
          explanation: "Breakpoints should be driven by your content — add one wherever the layout looks bad at a given width, not just at arbitrary standard sizes."
        },
        {
          question: "What does `width: 100vw` mean?",
          options: ["100 pixels wide", "The full width of the viewport", "100% of the parent container's width", "100 em units wide"],
          correctIndex: 1,
          explanation: "100vw means 100 viewport width units, equal to the full width of the browser window regardless of the element's parent."
        },
        {
          question: "Which HTML element and attribute pairing allows serving different image resolutions based on screen size?",
          options: ["<img responsive>", "<img srcset=\"...\">", "<image media=\"...\">", "<img device=\"...\">"],
          correctIndex: 1,
          explanation: "The srcset attribute on an <img> element lets browsers choose the most appropriate image file based on device pixel ratio and viewport size."
        },
        {
          question: "In a desktop-first approach, which media query type is used to target mobile screens?",
          options: ["@media (min-width: 768px)", "@media (max-width: 768px)", "@media (orientation: portrait)", "@media (screen: mobile)"],
          correctIndex: 1,
          explanation: "Desktop-first uses max-width queries to override styles for screens smaller than the threshold, which is the opposite of mobile-first."
        },
        {
          question: "What is the main advantage of using `rem` units for font sizes in responsive design?",
          options: ["They are always equal to 16px", "They scale relative to the root font size, making site-wide scaling easy", "They only work inside media queries", "They adjust automatically without media queries"],
          correctIndex: 1,
          explanation: "rem units are relative to the root (<html>) font size, so changing one value scales all rem-based text proportionally throughout the site."
        }
      ]
    },
    {
      id: "css-professional-bem",
      title: "CSS Methodologies: BEM Naming Convention",
      explanation: "As a CSS project grows, you start running into problems. Class names get vague and collide with each other. You end up with styles in one file accidentally overriding styles in another. Changing one component breaks a different one. These problems are not bugs in your code — they are symptoms of unstructured CSS.\n\nCSS methodologies are conventions that bring order to this chaos. The most widely used one is BEM, which stands for Block, Element, Modifier. BEM gives you a strict naming system for HTML classes that makes your CSS self-documenting and collision-resistant.\n\nA **Block** is an independent, reusable component — a standalone piece of UI that makes sense on its own. Examples: `.card`, `.nav`, `.button`, `.hero`. Blocks can appear anywhere on the page.\n\nAn **Element** is a part of a block that has no meaning outside it. Elements are named with double underscores: `.card__title`, `.card__image`, `.nav__item`. The double underscore clearly signals that `__title` belongs to `card` and has no independent meaning.\n\nA **Modifier** is a variation of a block or element. Modifiers are named with double dashes: `.button--primary`, `.button--large`, `.card--featured`, `.nav__item--active`. Modifiers do not replace the base class — they are added alongside it: `<button class=\"button button--primary button--large\">`.\n\nWhy does this help? Consider `.title` as a class name — where is it? Does it belong to a card, a hero, a modal? Now consider `.card__title` — it is instantly clear. And because block names are unique per component, class names never accidentally collide across components.\n\nAnother key rule: do not nest BEM selectors deeply. Instead of `.nav .nav__item a`, write `.nav__link`. BEM classes should be flat, not nested chains, which keeps specificity low and predictable. This is a major advantage over deeply nested Sass structures.\n\nBEM is not the only methodology — SMACSS, ITCSS, and OOCSS are others — but BEM is the most explicit and widely adopted. Many CSS frameworks and component libraries use BEM-inspired naming internally.\n\nOne practical tip: combine BEM with a utility-first approach for spacing and one-off adjustments. Use BEM classes for component structure and semantics, and small utility classes (like `.mt-1` for margin-top) for positioning and spacing. This hybrid approach is used by many production codebases.\n\nBEM feels verbose at first, but once your project has dozens of components, you will appreciate being able to look at any class name and instantly understand what it does and where it lives.",
      htmlExample: `<article class="product-card product-card--featured">
  <img class="product-card__image" src="https://picsum.photos/300/200" alt="Product">
  <div class="product-card__body">
    <h2 class="product-card__title">Wireless Headphones</h2>
    <p class="product-card__price">$89.99</p>
    <button class="btn btn--primary">Add to Cart</button>
    <button class="btn btn--ghost">Wishlist</button>
  </div>
</article>`,
      cssExample: `body {
  font-family: sans-serif;
  padding: 2rem;
  background: #f8fafc;
}

/* Block */
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 320px;
}

/* Modifier: featured variation */
.product-card--featured {
  border: 2px solid #6366f1;
}

/* Elements */
.product-card__image {
  width: 100%;
  display: block;
}

.product-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-card__title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1e293b;
}

.product-card__price {
  color: #6366f1;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Button block */
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: 2px solid #6366f1;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

/* Button modifiers */
.btn--primary {
  background: #6366f1;
  color: white;
}

.btn--ghost {
  background: transparent;
  color: #6366f1;
}

.btn--primary:hover {
  background: #4f46e5;
}`,
      exercises: [
        {
          title: "Name a Navigation Component with BEM",
          description: "Write HTML and CSS for a navigation bar using proper BEM naming. The block should be 'navbar'. It should have elements for the logo, a list of links, and an active link state handled by a modifier.",
          hint: "Use classes like .navbar, .navbar__logo, .navbar__list, .navbar__item, and .navbar__item--active for the selected link."
        },
        {
          title: "Add a Modifier to the Product Card",
          description: "Add a 'product-card--out-of-stock' modifier class to the existing product card. Style it to show a gray color scheme and make the 'Add to Cart' button look disabled (gray background, not-allowed cursor).",
          hint: "Add class product-card--out-of-stock to the article, then write .product-card--out-of-stock .btn--primary { background: #9ca3af; border-color: #9ca3af; cursor: not-allowed; }"
        }
      ],
      quiz: [
        {
          question: "What does BEM stand for?",
          options: ["Block, Entity, Modifier", "Block, Element, Modifier", "Base, Element, Method", "Block, Event, Method"],
          correctIndex: 1,
          explanation: "BEM stands for Block, Element, Modifier — a CSS naming methodology that organizes classes into these three categories."
        },
        {
          question: "In BEM, how are element class names separated from their block name?",
          options: ["Single underscore: .block_element", "Double underscore: .block__element", "Double dash: .block--element", "Single dash: .block-element"],
          correctIndex: 1,
          explanation: "BEM uses double underscores to separate a block name from its element name, e.g. .card__title."
        },
        {
          question: "In BEM, how are modifier class names separated from their block or element name?",
          options: ["Double underscore: .block__modifier", "Double dash: .block--modifier", "Dot notation: .block.modifier", "Camel case: .blockModifier"],
          correctIndex: 1,
          explanation: "BEM uses double dashes for modifiers, e.g. .button--primary or .card--featured."
        },
        {
          question: "Which of the following is a properly named BEM element class?",
          options: [".card-title", ".card--title", ".card__title", ".card.title"],
          correctIndex: 2,
          explanation: ".card__title uses the double underscore convention to show that 'title' is an element belonging to the 'card' block."
        },
        {
          question: "A BEM modifier should be used:",
          options: ["As the only class on an element, replacing the base class", "Alongside the base block or element class", "Only in JavaScript", "Only for color changes"],
          correctIndex: 1,
          explanation: "Modifiers are added in addition to the base class: <button class=\"btn btn--primary\">, never replacing the base class."
        },
        {
          question: "What is the main problem that BEM is designed to solve?",
          options: ["Slow CSS parsing", "Class name collisions and unclear component boundaries in large projects", "Lack of browser support for CSS", "CSS files being too large"],
          correctIndex: 1,
          explanation: "BEM's structured naming prevents class name collisions and makes component boundaries explicit, solving major scalability issues in large CSS codebases."
        },
        {
          question: "Which of the following BEST represents BEM naming for a navigation bar with an active link?",
          options: [
            "<li class=\"nav-item active\">",
            "<li class=\"nav__item nav__item--active\">",
            "<li class=\"nav--item--active\">",
            "<li class=\"nav_item_active\">"
          ],
          correctIndex: 1,
          explanation: "nav__item is the element class and nav__item--active is the modifier, both applied together following BEM convention."
        },
        {
          question: "In BEM, what is a 'Block'?",
          options: ["A container div that wraps all content", "A standalone, reusable component that makes sense on its own", "A CSS variable block", "The outermost HTML element only"],
          correctIndex: 1,
          explanation: "A Block is an independent, reusable component — something with standalone meaning like .button, .card, or .nav."
        },
        {
          question: "What specificity advantage does BEM provide?",
          options: ["All BEM selectors have zero specificity", "By using flat single-class selectors, specificity stays low and predictable", "BEM uses !important to guarantee specificity", "BEM automatically adds ID selectors for high specificity"],
          correctIndex: 1,
          explanation: "BEM's flat class structure avoids deeply nested selectors, keeping specificity low and consistent, making styles easier to override."
        },
        {
          question: "Which HTML is correct BEM usage?",
          options: [
            "<div class=\"card\"><h2 class=\"title\">Text</h2></div>",
            "<div class=\"card\"><h2 class=\"card__title\">Text</h2></div>",
            "<div class=\"card\"><h2 class=\"card--title\">Text</h2></div>",
            "<div class=\"card\"><h2 class=\"card title\">Text</h2></div>"
          ],
          correctIndex: 1,
          explanation: "card__title uses the correct double-underscore syntax to denote that 'title' is an element of the 'card' block."
        },
        {
          question: "Spot the BEM naming mistake: `<button class=\"btn--primary\">`",
          options: ["btn--primary is a valid standalone class", "The base class 'btn' is missing; the modifier should not be used alone", "The modifier should use double underscores", "Buttons cannot use BEM"],
          correctIndex: 1,
          explanation: "Modifiers should always accompany the base class. The correct markup is class=\"btn btn--primary\"."
        },
        {
          question: "Can an element have both a BEM element class and a BEM modifier class at the same time?",
          options: ["No, you can only use one BEM class per element", "Yes: class=\"nav__item nav__item--active\" is valid", "Only in JavaScript-controlled states", "Only if using a CSS preprocessor"],
          correctIndex: 1,
          explanation: "Yes, combining element and modifier classes is standard BEM: nav__item is the base and nav__item--active is the modifier variation."
        },
        {
          question: "Which is NOT a benefit of using BEM?",
          options: ["Self-documenting class names", "Reduced class name collisions", "Automatic CSS minification", "Predictable component structure"],
          correctIndex: 2,
          explanation: "BEM is a naming convention; it does not provide technical features like CSS minification. That is handled by build tools."
        },
        {
          question: "Why does BEM discourage deeply nested CSS selectors like `.card .card__title a`?",
          options: ["Deep nesting is slow to parse", "It increases specificity and makes styles harder to override predictably", "It is invalid CSS", "It only works in Sass"],
          correctIndex: 1,
          explanation: "Deep nesting raises specificity, making styles harder to override and breaking the low-specificity principle that makes BEM maintainable."
        },
        {
          question: "What is the BEM name for a large primary button?",
          options: [".button.primary.large", ".button__primary__large", ".button--primary--large", ".button--primary.button--large"],
          correctIndex: 3,
          explanation: "Multiple modifiers are added as separate classes: .button--primary and .button--large, both combined with the base .button class."
        },
        {
          question: "In BEM, can an element belong to another element (e.g., `.card__body__title`)?",
          options: ["Yes, unlimited nesting is supported", "No, elements only relate to their block, not to other elements", "Only with three levels maximum", "Only using double-dash syntax"],
          correctIndex: 1,
          explanation: "BEM elements relate directly to their block, not to other elements. .card__title is correct; .card__body__title is considered poor BEM practice."
        },
        {
          question: "A developer writes `.btn { color: blue; }` and `.btn--danger { color: red; }`. What color will `<button class=\"btn btn--danger\">` be?",
          options: ["Blue, because .btn is defined first", "Red, because .btn--danger appears later and has equal specificity", "Neither; there is a conflict", "It depends on the browser"],
          correctIndex: 1,
          explanation: "Both selectors have the same specificity (one class each), so the one declared later in the stylesheet wins — .btn--danger sets red."
        },
        {
          question: "Which statement about BEM and JavaScript is true?",
          options: ["BEM class names cannot be used in JavaScript", "JavaScript can add or remove BEM modifier classes to change component state", "BEM requires JavaScript to work", "BEM replaces JavaScript entirely"],
          correctIndex: 1,
          explanation: "JavaScript commonly adds or removes BEM modifier classes (like --active, --open, --loading) to update visual state dynamically."
        },
        {
          question: "A team decides to use BEM but someone writes `.card__title h2 { }`. What rule is being broken?",
          options: ["Elements should not have type selectors chained with BEM classes", "h2 cannot be styled inside a card", "card__title should be a modifier not an element", "BEM forbids the use of element selectors entirely"],
          correctIndex: 0,
          explanation: "BEM classes are designed to be used as flat single-class selectors. Chaining a type selector (h2) increases specificity unpredictably and breaks BEM's flat structure principle."
        },
        {
          question: "Which statement best describes the relationship between BEM and CSS preprocessors like Sass?",
          options: ["BEM requires Sass to work", "BEM and Sass are competing methodologies", "BEM is a naming convention that works with plain CSS and also pairs well with Sass nesting features", "Sass automatically generates BEM class names"],
          correctIndex: 2,
          explanation: "BEM is purely a naming convention that works in any CSS context. Sass's ampersand nesting feature (&) makes writing BEM selectors more convenient but is not required."
        }
      ]
    },
    {
      id: "css-professional-grid-layouts",
      title: "CSS Grid for Full Page Layouts",
      explanation: "You have likely used CSS Grid to arrange a few cards in a row. But Grid's real power shines when you use it to structure the entire page — the header, sidebar, main content area, and footer all snapping into place with just a few lines of code.\n\nA classic full-page layout has a header at the top spanning the full width, a sidebar on the left, a main content area on the right, and a footer at the bottom also spanning the full width. With CSS Grid, you can describe this layout using the `grid-template-areas` property, which lets you draw the layout almost like ASCII art.\n\nHere is the pattern:\n```css\n.page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n}\n```\n\nThen assign each child to its area: `header { grid-area: header; }`, `aside { grid-area: sidebar; }`, and so on. The visual clarity of `grid-template-areas` is unmatched — you can understand the layout at a glance.\n\nThe `fr` unit (fraction) is the heart of flexible grid layouts. `1fr` means 'take one share of the remaining space.' `grid-template-columns: 250px 1fr` creates a fixed 250px sidebar and a main area that fills everything else. `1fr 1fr 1fr` creates three equal columns. `2fr 1fr` creates a two-thirds and one-third split.\n\nFor responsive full-page layouts, swap to a single column on mobile by overriding `grid-template-columns` and `grid-template-areas` inside a media query. On mobile, you might stack header, then main, then sidebar, then footer — a completely different visual order without changing the HTML.\n\nThe `gap` property (shorthand for `row-gap` and `column-gap`) adds consistent spacing between grid tracks. Unlike margins, gap only appears between items, never on the outer edges, which makes it simpler to use.\n\nGrid items can span multiple rows or columns with `grid-column: 1 / 3` or `grid-row: 1 / span 2`. Combined with named areas, you can create complex editorial layouts, magazine-style pages, and dashboard UIs.\n\n`minmax(min, max)` is another powerful Grid function. `minmax(0, 1fr)` prevents items from overflowing when content is larger than expected. `repeat(auto-fill, minmax(200px, 1fr))` creates a responsive column grid that automatically adjusts the number of columns without media queries.\n\nCSS Grid and Flexbox are complementary, not competing. Use Grid for two-dimensional page-level layouts and use Flexbox for one-dimensional component-level arrangements inside grid areas.",
      htmlExample: `<div class="page-layout">
  <header class="page-header">
    <h1>Site Title</h1>
  </header>
  <aside class="page-sidebar">
    <nav>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>
  <main class="page-main">
    <h2>Main Content</h2>
    <p>This is where the primary content lives. The sidebar stays fixed width while this area grows to fill available space.</p>
  </main>
  <footer class="page-footer">
    <p>&copy; 2024 My Site</p>
  </footer>
</div>`,
      cssExample: `* { box-sizing: border-box; margin: 0; padding: 0; }

body { font-family: sans-serif; background: #f1f5f9; }

.page-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 0;
}

.page-header {
  grid-area: header;
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
}

.page-sidebar {
  grid-area: sidebar;
  background: #334155;
  color: #cbd5e1;
  padding: 1.5rem 1rem;
}

.page-sidebar ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-sidebar a {
  color: #94a3b8;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.page-sidebar a:hover {
  background: #475569;
  color: white;
}

.page-main {
  grid-area: main;
  padding: 2rem;
  background: white;
}

.page-main h2 {
  margin-bottom: 1rem;
  color: #1e293b;
}

.page-footer {
  grid-area: footer;
  background: #0f172a;
  color: #94a3b8;
  padding: 1rem 2rem;
  text-align: center;
}`,
      exercises: [
        {
          title: "Add a Second Sidebar",
          description: "Modify the page layout to have both a left sidebar and a right sidebar, with the main content in the middle. Update grid-template-columns and grid-template-areas accordingly.",
          hint: "Change grid-template-columns to 200px 1fr 200px and update grid-template-areas to \"header header header\" / \"sidebar main aside\" / \"footer footer footer\""
        },
        {
          title: "Responsive Full-Page Layout",
          description: "Make the page layout stack vertically on mobile screens smaller than 768px. The sidebar should appear after the header but before main content. Use a min-width media query to restore the two-column layout on larger screens.",
          hint: "For mobile, set grid-template-columns: 1fr and grid-template-areas with each section on its own row. Restore the side-by-side layout inside @media (min-width: 768px)."
        }
      ],
      quiz: [
        {
          question: "Which CSS property lets you name regions of a grid layout and assign elements to them visually?",
          options: ["grid-layout-names", "grid-template-areas", "grid-zones", "named-areas"],
          correctIndex: 1,
          explanation: "grid-template-areas lets you define named areas in a grid and then assign elements using the grid-area property."
        },
        {
          question: "What does the `fr` unit represent in CSS Grid?",
          options: ["Fixed ratio", "A fraction of the remaining free space in the grid container", "Font-relative size", "Full-width row"],
          correctIndex: 1,
          explanation: "fr stands for fraction — it divides the available free space proportionally among grid tracks that use fr units."
        },
        {
          question: "What does `grid-template-columns: 250px 1fr` create?",
          options: ["Two equal columns", "A 250px column and one column that fills all remaining space", "A 250px column and a 1px column", "250 columns each 1fr wide"],
          correctIndex: 1,
          explanation: "250px creates a fixed-width first column, and 1fr gives the remaining space to the second column."
        },
        {
          question: "How do you make a grid item span two columns?",
          options: ["grid-span: 2", "width: 200%", "grid-column: span 2", "colspan: 2"],
          correctIndex: 2,
          explanation: "grid-column: span 2 tells the grid item to occupy two column tracks. You can also use grid-column: 1 / 3 to specify start and end lines."
        },
        {
          question: "What does `min-height: 100vh` on a grid container achieve in a full-page layout?",
          options: ["Prevents scrolling", "Ensures the layout stretches to at least the full viewport height", "Sets the font size relative to viewport", "Locks the grid to exactly the screen size"],
          correctIndex: 1,
          explanation: "min-height: 100vh ensures the grid container is at least as tall as the viewport, so footers stay at the bottom even with little content."
        },
        {
          question: "What does `grid-template-areas: \"header header\" \"sidebar main\" \"footer footer\"` describe?",
          options: ["A one-column layout", "A layout with a full-width header, two-column middle section, and full-width footer", "A layout where sidebar is below footer", "A three-column layout"],
          correctIndex: 1,
          explanation: "The string diagram shows header spanning two columns, a two-column middle with sidebar and main, and footer spanning both columns."
        },
        {
          question: "What is the purpose of the `gap` property in CSS Grid?",
          options: ["Adds spacing only around the outside edges of the grid", "Adds space between grid rows and columns without affecting outer edges", "Adds margin to every grid item", "Sets the grid line color"],
          correctIndex: 1,
          explanation: "gap creates gutters between grid tracks (rows and columns) without adding extra space on the outer edges of the grid container."
        },
        {
          question: "How would you assign an element to the 'sidebar' named area defined in grid-template-areas?",
          options: ["grid-placement: sidebar", "grid-area: sidebar", "area: sidebar", "grid-region: sidebar"],
          correctIndex: 1,
          explanation: "grid-area: sidebar assigns a grid item to the named area 'sidebar' defined in grid-template-areas."
        },
        {
          question: "What does `repeat(3, 1fr)` do in grid-template-columns?",
          options: ["Creates one column repeated 3 times with a 1px gap", "Creates three equal-width columns that share available space", "Repeats the grid 3 times on the page", "Creates a 3fr by 1fr grid"],
          correctIndex: 1,
          explanation: "repeat(3, 1fr) is shorthand for 1fr 1fr 1fr, creating three columns that each take one-third of the available space."
        },
        {
          question: "Which CSS Grid function creates a responsive column layout that automatically adjusts the number of columns?",
          options: ["repeat(auto, 1fr)", "grid-auto-columns: flexible", "repeat(auto-fit, minmax(200px, 1fr))", "grid-template-columns: responsive"],
          correctIndex: 2,
          explanation: "repeat(auto-fit, minmax(200px, 1fr)) creates as many 200px-minimum columns as will fit, automatically adjusting without media queries."
        },
        {
          question: "What happens to a grid row with `grid-template-rows: auto 1fr auto`?",
          options: ["All three rows are equal height", "First and last rows fit their content; the middle row expands to fill remaining space", "All rows use automatic height", "The middle row collapses to zero"],
          correctIndex: 1,
          explanation: "auto rows size to their content; the 1fr middle row takes all remaining space after auto rows are sized, useful for sticky footer layouts."
        },
        {
          question: "When should you prefer CSS Grid over Flexbox?",
          options: ["When centering a single element", "When laying out a two-dimensional page structure with rows and columns", "When styling text", "When creating hover animations"],
          correctIndex: 1,
          explanation: "CSS Grid excels at two-dimensional layouts (rows AND columns simultaneously), while Flexbox is better for one-dimensional arrangements."
        },
        {
          question: "Spot the bug: `grid-template-areas: \"header\" \"sidebar main\" \"footer\"` — the header does not span both columns.",
          options: ["header needs grid-area: header", "header area only fills one column because it is not repeated in the string", "footer needs to be defined first", "grid-area names must be quoted"],
          correctIndex: 1,
          explanation: "In grid-template-areas, each column needs a name in the string. Writing just \"header\" puts it in the first column only; use \"header header\" to span two columns."
        },
        {
          question: "What does `grid-column: 1 / -1` do?",
          options: ["Places the item in the first column only", "Spans the item across all columns from the first to the last grid line", "Hides the item", "Creates a negative margin on the column"],
          correctIndex: 1,
          explanation: "Using -1 as the end line refers to the last explicit grid line, so 1 / -1 spans the element across all defined columns."
        },
        {
          question: "What is the difference between `grid-column-gap` and `gap`?",
          options: ["They are different properties with different behaviors", "gap is shorthand for both row-gap and column-gap; grid-column-gap is the older column-only version", "grid-column-gap applies to flex containers", "gap only works in subgrids"],
          correctIndex: 1,
          explanation: "gap is the modern shorthand for both row-gap and column-gap. grid-column-gap is the deprecated legacy name for column-gap."
        },
        {
          question: "How do you make a grid item occupy rows 2 through 4?",
          options: ["grid-row: 2-4", "grid-row: 2 / 4", "row-span: 3", "grid-row: 2 to 4"],
          correctIndex: 1,
          explanation: "grid-row: 2 / 4 uses start-line / end-line notation to span from row line 2 to row line 4, covering rows 2 and 3."
        },
        {
          question: "What does `align-items: stretch` (the default) do in a grid container?",
          options: ["Horizontally stretches items to fill their column track", "Vertically stretches items to fill their row track", "Centers items in both axes", "Stretches the grid container to full page width"],
          correctIndex: 1,
          explanation: "align-items controls vertical alignment within row tracks; stretch (the default) makes items fill the full height of their grid cell."
        },
        {
          question: "In grid-template-areas, what does a period (.) represent?",
          options: ["A named 'dot' area", "An empty cell with no assigned grid area", "A column separator", "The center of the grid"],
          correctIndex: 1,
          explanation: "A period in grid-template-areas represents an empty cell that is not assigned to any named area, allowing you to leave gaps in the layout."
        },
        {
          question: "Which property would you use on a grid item to manually place it in column 2, row 3?",
          options: ["position: col-2 row-3", "grid-position: 2/3", "grid-column: 2; grid-row: 3;", "place: 2 / 3"],
          correctIndex: 2,
          explanation: "Setting grid-column: 2 and grid-row: 3 places the item at the intersection of column track 2 and row track 3."
        },
        {
          question: "What is a 'subgrid' in CSS Grid?",
          options: ["A nested div with its own grid", "A grid item that inherits and aligns with its parent grid's tracks", "A grid inside a flex container", "A grid with fewer than 3 columns"],
          correctIndex: 1,
          explanation: "A subgrid (using grid-template-columns: subgrid) allows a grid item to participate in its parent grid's track sizing, enabling alignment across nested components."
        }
      ]
    },
    {
      id: "css-professional-accessibility",
      title: "Accessibility Considerations in CSS",
      explanation: "Building a website that works only for sighted users with a mouse is like publishing a book only in one language — you are excluding a massive audience. CSS plays a significant role in web accessibility (often abbreviated A11y). Good accessible CSS does not just help screen reader users; it benefits keyboard users, users with low vision, users with photosensitivity, and people on slow connections too.\n\nThe most common accessibility mistake in CSS is removing the default focus indicator without replacing it. When users navigate with a keyboard (Tab key), browsers show an outline around focused elements. Many developers write `outline: none` or `outline: 0` to remove this outline because it looks unsightly. This makes the site completely unusable for keyboard-only users. Instead, style the focus outline to match your design: `:focus { outline: 2px solid #6366f1; outline-offset: 2px; }`. The `:focus-visible` pseudo-class is even better — it shows the focus ring only for keyboard navigation, not when clicking with a mouse.\n\nColor contrast is crucial. Text must have sufficient contrast against its background for users with low vision or color blindness. The WCAG 2.1 guidelines specify a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Tools like the WebAIM Contrast Checker help you verify this. Avoid conveying information through color alone — for example, do not mark an error field only by turning its border red. Add an error icon or error text too.\n\nHiding elements has different accessibility implications depending on how you do it. `display: none` removes the element from both the visual layout AND the accessibility tree — screen readers skip it. `visibility: hidden` hides it visually but still takes up space, and screen readers also skip it. `opacity: 0` makes it invisible but keeps it in the accessibility tree — screen readers can still read it. Sometimes you want a screen-reader-only element: the `.sr-only` utility class uses a carefully crafted clip technique to visually hide an element while keeping it accessible.\n\nText sizing should use relative units. Never use `font-size: 12px` on body text. Use `rem` units so that when a user increases their browser's default font size in settings, your text scales accordingly. `px` units ignore browser font size preferences.\n\nMotion sensitivity is a real medical concern — some users experience dizziness or nausea from animations. Always wrap non-essential animations in `@media (prefers-reduced-motion: reduce)` and either disable or simplify them for those users.\n\nSemantic HTML and CSS work together. Using `<nav>` instead of `<div class=\"nav\">` gives screen readers a landmark to navigate to. CSS can reveal or hide semantic information but cannot add it — so getting the HTML right is foundational.",
      htmlExample: `<form class="login-form">
  <h2>Sign In</h2>
  <label for="email">Email Address</label>
  <input type="email" id="email" class="input" placeholder="you@example.com">
  <label for="password">Password</label>
  <input type="password" id="password" class="input input--error" aria-describedby="pw-error">
  <p id="pw-error" class="error-message">Password must be at least 8 characters.</p>
  <button class="btn" type="submit">Sign In</button>
  <span class="sr-only">Secure login form</span>
</form>`,
      cssExample: `* { box-sizing: border-box; }

body {
  font-family: sans-serif;
  padding: 2rem;
  background: #f8fafc;
  font-size: 1rem;
}

.login-form {
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
}

/* Accessible focus style for the button */
.btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.btn:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 3px;
}

.input--error {
  border-color: #ef4444;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: -0.5rem;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`,
      exercises: [
        {
          title: "Design an Accessible Focus Ring",
          description: "Take a set of navigation links that currently have no focus style and add a clearly visible focus ring using :focus-visible. The ring should be a 2px solid outline in a color that contrasts well against the link's background.",
          hint: "Use a:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 2px; } to add a visible keyboard focus style."
        },
        {
          title: "Respect Reduced Motion Preferences",
          description: "Take a spinning loading animation and wrap it in a prefers-reduced-motion media query so the animation stops for users who have enabled the reduced-motion setting in their OS.",
          hint: "@media (prefers-reduced-motion: reduce) { .loader { animation: none; } }"
        }
      ],
      quiz: [
        {
          question: "Why is `outline: none` on focused elements considered an accessibility problem?",
          options: ["It causes a CSS error", "It removes the visual indicator that helps keyboard users know which element is focused", "It makes the element invisible to screen readers", "It only affects touchscreen users"],
          correctIndex: 1,
          explanation: "Removing the focus outline without a replacement makes it impossible for keyboard-only users to see which element currently has focus."
        },
        {
          question: "Which pseudo-class shows a focus style only for keyboard navigation, not for mouse clicks?",
          options: [":focus", ":focus-within", ":focus-visible", ":keyboard-focus"],
          correctIndex: 2,
          explanation: ":focus-visible applies only when the browser determines focus came from keyboard navigation, not from a mouse click."
        },
        {
          question: "What is the WCAG 2.1 minimum contrast ratio for normal body text?",
          options: ["2:1", "3:1", "4.5:1", "7:1"],
          correctIndex: 2,
          explanation: "WCAG 2.1 Level AA requires a minimum contrast ratio of 4.5:1 between normal-sized text and its background color."
        },
        {
          question: "Which CSS hiding technique removes an element from both the visual layout AND the accessibility tree?",
          options: ["opacity: 0", "visibility: hidden", "display: none", "clip-path: inset(100%)"],
          correctIndex: 2,
          explanation: "display: none removes the element from the document flow and the accessibility tree, making it invisible to both sighted users and screen readers."
        },
        {
          question: "What is the purpose of the `.sr-only` CSS class pattern?",
          options: ["It styles elements for screen recording", "It visually hides content while keeping it readable by screen readers", "It sets font size for screen-reader software", "It removes elements from the DOM"],
          correctIndex: 1,
          explanation: "The .sr-only pattern uses clip, position, and dimension tricks to hide content visually while keeping it in the accessibility tree for screen readers."
        },
        {
          question: "Which font-size unit should you use for body text to respect user browser font-size preferences?",
          options: ["px", "cm", "rem", "pt"],
          correctIndex: 2,
          explanation: "rem units are relative to the root font size, so when a user increases their browser's default font size, rem-sized text scales accordingly. px ignores this preference."
        },
        {
          question: "What media query should you use to disable or simplify animations for users with motion sensitivity?",
          options: [
            "@media (motion: none)",
            "@media (prefers-reduced-motion: reduce)",
            "@media (accessibility: no-animation)",
            "@media (animation: disabled)"
          ],
          correctIndex: 1,
          explanation: "@media (prefers-reduced-motion: reduce) detects the user's OS-level setting to minimize motion, allowing you to disable or simplify animations."
        },
        {
          question: "An error state is only shown by changing a form field's border color to red. What accessibility problem does this create?",
          options: ["Red borders are not valid CSS", "Users who are colorblind may not perceive the color difference", "Screen readers cannot read borders", "Red is not a WCAG-approved color"],
          correctIndex: 1,
          explanation: "Relying solely on color to convey information excludes users with color blindness. You must also provide text or an icon to communicate the error."
        },
        {
          question: "What does `visibility: hidden` do compared to `opacity: 0`?",
          options: ["They are identical in every way", "visibility: hidden is skipped by screen readers; opacity: 0 is still in the accessibility tree", "opacity: 0 is skipped by screen readers; visibility: hidden is not", "Both are in the accessibility tree"],
          correctIndex: 1,
          explanation: "visibility: hidden removes the element from the accessibility tree while opacity: 0 leaves it there, meaning screen readers can still read opacity: 0 content."
        },
        {
          question: "What `outline-offset` property does in an accessible focus style?",
          options: ["Removes the outline", "Adds space between the element's border and its focus outline", "Sets the outline width", "Changes the outline color"],
          correctIndex: 1,
          explanation: "outline-offset creates a gap between the element edge and the outline ring, making focus indicators clearer and more visually distinct."
        },
        {
          question: "Can CSS alone add accessible semantics to an element (like making a div announce as a button to a screen reader)?",
          options: ["Yes, using role: 'button' in CSS", "No, semantics must come from HTML (semantic tags or ARIA attributes)", "Yes, using display: button in CSS", "Yes, using content: 'button' in CSS"],
          correctIndex: 1,
          explanation: "CSS is purely visual; semantic meaning for assistive technologies must come from HTML elements like <button> or ARIA attributes in the markup."
        },
        {
          question: "What is the minimum recommended touch target size for interactive elements on mobile?",
          options: ["20x20px", "32x32px", "44x44px", "60x60px"],
          correctIndex: 2,
          explanation: "44x44px is the widely recommended minimum touch target size based on Apple's Human Interface Guidelines and WCAG 2.5.5 guidelines."
        },
        {
          question: "Spot the accessibility issue: `a { color: #aaaaaa; background: #ffffff; }`",
          options: ["Links cannot use the color property", "Gray #aaaaaa on white #ffffff fails the minimum 4.5:1 contrast ratio", "The background should be transparent", "Links need a font-size override"],
          correctIndex: 1,
          explanation: "#aaaaaa on #ffffff has approximately 2.32:1 contrast ratio, which fails WCAG's minimum 4.5:1 requirement for normal text."
        },
        {
          question: "What does `@media (prefers-color-scheme: dark)` allow you to do?",
          options: ["Force all users into dark mode", "Apply different styles when the user's OS is in dark mode", "Detect if the user has night mode on their phone", "Only applies to OLED screens"],
          correctIndex: 1,
          explanation: "@media (prefers-color-scheme: dark) detects if the user's operating system or browser is set to dark mode, letting you provide an appropriate color scheme."
        },
        {
          question: "Which HTML element should you use for site-wide navigation to give screen readers a navigation landmark?",
          options: ["<div class=\"nav\">", "<section class=\"navigation\">", "<nav>", "<header>"],
          correctIndex: 2,
          explanation: "The semantic <nav> element creates a navigation landmark that screen readers can jump to directly, unlike a generic <div>."
        },
        {
          question: "What is the best practice when creating a custom styled checkbox?",
          options: ["Replace the <input type=\"checkbox\"> completely with a <div>", "Use the real <input type=\"checkbox\"> element visually hidden, with a styled label", "Use JavaScript to handle all checkbox states", "Create a <button> that looks like a checkbox"],
          correctIndex: 1,
          explanation: "Hiding the native checkbox visually (with .sr-only) while styling the label maintains full keyboard accessibility and screen reader support."
        },
        {
          question: "Which property value pair creates a skip-link that becomes visible only when focused (useful for keyboard users to skip to main content)?",
          options: [
            ".skip-link { display: none; } .skip-link:focus { display: block; }",
            ".skip-link { position: absolute; top: -100%; } .skip-link:focus { top: 0; }",
            ".skip-link { opacity: 0; } .skip-link:hover { opacity: 1; }",
            ".skip-link { visibility: hidden; }"
          ],
          correctIndex: 1,
          explanation: "Positioning the skip link off-screen by default and moving it into view on :focus creates a keyboard-accessible skip link that does not clutter the visual design."
        },
        {
          question: "What is the accessible color contrast requirement for large text (18pt or 14pt bold)?",
          options: ["7:1", "4.5:1", "3:1", "2:1"],
          correctIndex: 2,
          explanation: "WCAG 2.1 Level AA requires only a 3:1 contrast ratio for large text (18pt or 14pt bold), since larger text is easier to read at lower contrast."
        },
        {
          question: "An icon button has no text label. What CSS technique helps make it accessible?",
          options: ["CSS cannot help; use the alt attribute", "Add text with .sr-only class inside the button for screen readers", "Use font-size: 0 on the button", "Add border-radius: 50% to indicate it is interactive"],
          correctIndex: 1,
          explanation: "Including a text label inside the button and hiding it visually with .sr-only provides a spoken label for screen readers without affecting the visual icon-only design."
        },
        {
          question: "What does `cursor: not-allowed` communicate about an element?",
          options: ["It prevents clicking on the element", "It visually signals that the element is disabled or the action is unavailable", "It hides the cursor completely", "It blocks keyboard focus"],
          correctIndex: 1,
          explanation: "cursor: not-allowed changes the mouse cursor to a 'no' symbol, visually communicating that the action is not permitted, though it does not actually prevent interaction."
        }
      ]
    },
    {
      id: "css-professional-performance",
      title: "Performance and Best Practices for Maintainable CSS",
      explanation: "Writing CSS that works is the first milestone. Writing CSS that still works six months later, maintained by a team of five people, is a different challenge entirely. Professional CSS requires thinking about performance, organization, and long-term maintainability from the start.\n\nStart with organization. Structure your stylesheet in a logical order: custom properties (CSS variables) at the top, followed by resets, then base/typography styles, then component styles, and finally utility classes at the bottom. Many teams adopt a folder structure where each component has its own CSS file, compiled together by a build tool.\n\nCSS custom properties (variables) are one of the most powerful tools for maintainable CSS. Define them on `:root` for global access: `:root { --color-primary: #6366f1; --spacing-md: 1rem; }`. Using variables means changing your brand color requires editing one line instead of searching and replacing across dozens of files.\n\nThe cascade and specificity can become nightmares in large projects. Keep specificity as low as possible — favor single-class selectors over chained selectors like `.card.featured.active`. Avoid ID selectors in CSS (use classes instead); they have very high specificity that is hard to override. Avoid `!important` except as a last resort — it breaks the natural cascade and makes debugging painful.\n\nFor rendering performance, prefer compositing-friendly properties. Animations using `transform` and `opacity` are handled by the GPU compositor thread without causing layout recalculations. Avoid animating `width`, `height`, `top`, `left`, `margin`, or `padding` in performance-critical animations.\n\nThe browser paints the screen in three stages: **layout** (calculating sizes and positions), **paint** (drawing colors and text), and **composite** (combining layers). Changing `width` triggers layout. Changing `color` triggers paint. Changing `transform` or `opacity` only triggers composite — the cheapest and fastest stage.\n\nReduce unused CSS. In production projects, tools like PurgeCSS or a framework's built-in tree-shaking remove CSS classes that are never used in your HTML. This can dramatically reduce file sizes, especially when using utility-first frameworks.\n\nShorthand properties like `margin: 1rem 0` are concise, but be aware they reset sub-properties you did not mention. `background: blue` resets `background-image`, `background-position`, and all other background sub-properties. Use shorthands deliberately.\n\nComments matter. Document non-obvious decisions: `/* z-index: 100 — must stay above the sticky header at z-index: 50 */`. Future you (and your teammates) will be grateful. Well-named CSS custom properties are also a form of documentation.\n\nFinally, audit your CSS regularly. Browser DevTools have a Coverage tab showing which CSS rules are actually used on the current page. Use it to identify bloat and dead code.",
      htmlExample: `<div class="demo-panel">
  <h2 class="demo-panel__title">CSS Variables Demo</h2>
  <p class="demo-panel__text">This panel uses CSS custom properties for all its colors and spacing.</p>
  <div class="demo-panel__actions">
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--secondary">Secondary</button>
  </div>
</div>`,
      cssExample: `/* 1. Custom Properties */
:root {
  --color-primary: #6366f1;
  --color-secondary: #ec4899;
  --color-text: #1e293b;
  --color-bg: #f8fafc;
  --border-radius-md: 8px;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --shadow-card: 0 2px 8px rgba(0,0,0,0.1);
  --transition-fast: 0.2s ease;
}

/* 2. Base styles */
* { box-sizing: border-box; }

body {
  font-family: sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--spacing-lg);
}

/* 3. Component styles */
.demo-panel {
  background: white;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-card);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.demo-panel__title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-primary);
}

.demo-panel__actions {
  display: flex;
  gap: var(--spacing-sm);
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: bold;
  transition: opacity var(--transition-fast);
}

.btn:hover {
  opacity: 0.85;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--secondary {
  background: var(--color-secondary);
  color: white;
}`,
      exercises: [
        {
          title: "Refactor with CSS Variables",
          description: "Take a stylesheet that uses hex color values (#3b82f6) in at least 5 different places and refactor it to use a CSS custom property --color-brand defined on :root. Replace all occurrences with var(--color-brand).",
          hint: "Add :root { --color-brand: #3b82f6; } at the top of your CSS, then replace each hard-coded #3b82f6 with var(--color-brand)."
        },
        {
          title: "Improve Specificity",
          description: "Find a stylesheet with selectors like `.card.active .card__title a { color: red; }` and refactor it to use lower-specificity BEM-style classes instead, such as `.card__title--active-link { color: red; }`.",
          hint: "Add a modifier class directly to the element that needs the style change instead of building a deeply nested selector chain."
        }
      ],
      quiz: [
        {
          question: "What is a CSS custom property (variable)?",
          options: ["A JavaScript variable used in CSS", "A reusable value defined with -- prefix and retrieved with var()", "A browser-specific CSS extension", "A property unique to a single element"],
          correctIndex: 1,
          explanation: "CSS custom properties are defined with a double-dash prefix (e.g., --color-primary) and accessed with the var() function, enabling reusable values across a stylesheet."
        },
        {
          question: "Where should you typically declare global CSS custom properties?",
          options: ["Inside @media queries", "On the body selector", "On the :root pseudo-class", "Inside each component selector"],
          correctIndex: 2,
          explanation: ":root represents the top-level element (html) and has the highest scope, making it the conventional place for global CSS custom properties."
        },
        {
          question: "Which browser rendering stage is triggered only by changing `transform` or `opacity`?",
          options: ["Layout", "Paint", "Composite", "Reflow"],
          correctIndex: 2,
          explanation: "transform and opacity changes only require the composite stage, handled by the GPU, which is the cheapest stage and why these properties are preferred for animation."
        },
        {
          question: "What does changing `width` trigger in the browser rendering pipeline?",
          options: ["Only composite", "Only paint", "Layout, paint, and composite", "Only layout"],
          correctIndex: 2,
          explanation: "Changing width forces the browser to recalculate layout (sizes and positions), then repaint, then composite — all three stages, making it the most expensive to animate."
        },
        {
          question: "Why should you avoid using ID selectors in CSS?",
          options: ["ID selectors do not work in CSS", "They have very high specificity (100 points) making overrides difficult", "They are deprecated in CSS3", "They only work in Internet Explorer"],
          correctIndex: 1,
          explanation: "ID selectors have a specificity of 100, much higher than class selectors (10), making it very hard to override ID-based styles without !important."
        },
        {
          question: "What is the specificity of `.card__title` (a single class selector)?",
          options: ["0,0,0,1 (type selector level)", "0,1,0,0 (class selector level)", "1,0,0,0 (ID selector level)", "0,0,0,0 (no specificity)"],
          correctIndex: 1,
          explanation: "A single class selector has a specificity of (0,1,0,0) — one class-level point. This is the recommended specificity level for maintainable CSS."
        },
        {
          question: "What is the problem with overusing `!important` in CSS?",
          options: ["It causes syntax errors", "It breaks the natural cascade, making styles hard to override and debug", "It is only available in inline styles", "It prevents transitions from working"],
          correctIndex: 1,
          explanation: "!important overrides the normal cascade, making it very hard to override styles predictably. It often leads to escalating !important wars in large codebases."
        },
        {
          question: "What does PurgeCSS do?",
          options: ["Minifies CSS files", "Removes CSS rules that are not referenced in your HTML or JS files", "Formats CSS for readability", "Adds vendor prefixes automatically"],
          correctIndex: 1,
          explanation: "PurgeCSS analyzes your content files and removes any CSS selectors that are not found, dramatically reducing stylesheet file size in production."
        },
        {
          question: "What is the benefit of using `var(--spacing-md)` instead of hard-coding `1rem` everywhere?",
          options: ["var() is faster to parse", "Changing the spacing system requires updating only one variable definition", "var() works in all browsers including IE6", "rem units cannot be hard-coded"],
          correctIndex: 1,
          explanation: "CSS custom properties centralize values so that changing --spacing-md once updates every element that uses it, making design system changes effortless."
        },
        {
          question: "What does the browser DevTools Coverage tab help you identify?",
          options: ["JavaScript errors", "Which CSS rules are unused on the current page", "Color contrast ratios", "Missing font files"],
          correctIndex: 1,
          explanation: "The Coverage tab in Chrome DevTools shows what percentage of loaded CSS (and JS) is actually used on the current page, helping identify unnecessary bloat."
        },
        {
          question: "Which CSS property shorthand can unexpectedly reset sub-properties you did not intend to change?",
          options: ["color", "font-size", "background (shorthand)", "display"],
          correctIndex: 2,
          explanation: "Writing `background: blue` resets all other background sub-properties (background-image, background-repeat, background-size, etc.) to their defaults."
        },
        {
          question: "What is the recommended order for a well-organized CSS file?",
          options: ["Components, utilities, variables, resets", "Variables/custom properties, resets, base styles, components, utilities", "Utilities, then all other styles alphabetically", "No order; CSS is not order-dependent"],
          correctIndex: 1,
          explanation: "A logical order starting with variables, then resets, then base styles, then components, and utilities at the end makes CSS predictable and easy to navigate."
        },
        {
          question: "How do you provide a fallback value if a CSS custom property is not defined?",
          options: ["var(--color, fallback-value)", "custom-var(--color, #000)", "var-fallback(--color, #000)", "--color ?? #000"],
          correctIndex: 0,
          explanation: "var() accepts an optional second argument as the fallback: var(--color-primary, #6366f1) uses the fallback if --color-primary is not defined."
        },
        {
          question: "Spot the performance issue: an animation runs on the 'width' property from 100px to 200px on a frequently animated element.",
          options: ["width animations require a specific unit", "Animating width triggers layout recalculation on every frame, causing jank", "width cannot be animated", "The values are too close together"],
          correctIndex: 1,
          explanation: "Animating width triggers layout on every frame, which is expensive. Replace it with transform: scaleX() for the same visual effect with GPU-composited performance."
        },
        {
          question: "What makes CSS custom properties more powerful than Sass variables?",
          options: ["Sass variables are not real CSS", "CSS custom properties are live and can be changed at runtime with JavaScript or media queries", "Custom properties work in all browsers; Sass variables do not", "Custom properties have higher specificity"],
          correctIndex: 1,
          explanation: "Unlike Sass variables which are compiled to static values, CSS custom properties are live in the browser, can be changed with JavaScript, and can be overridden inside media queries or component scopes."
        },
        {
          question: "What is 'selector specificity' in CSS?",
          options: ["How precisely a selector describes an element's position in the DOM", "A scoring system that determines which rule wins when two rules target the same element", "The number of elements a selector matches", "How quickly a selector is parsed"],
          correctIndex: 1,
          explanation: "Specificity is a weight/score assigned to CSS selectors. When multiple rules target the same element and property, the rule with the highest specificity wins."
        },
        {
          question: "Why is it better to add classes with JavaScript than to toggle inline styles directly?",
          options: ["JavaScript cannot set inline styles", "Classes keep styling concerns in CSS where they belong, making code easier to maintain", "Inline styles do not work in modern browsers", "Classes load faster than inline styles"],
          correctIndex: 1,
          explanation: "Adding/removing CSS classes from JavaScript keeps style logic in the stylesheet (separation of concerns), making changes easier and avoiding hard-to-override inline style specificity."
        },
        {
          question: "What does `will-change: transform` hint to the browser?",
          options: ["Locks the transform value permanently", "Pre-promotes the element to its own composite layer, reducing animation jank", "Prevents transforms from being applied", "Only works with 3D transforms"],
          correctIndex: 1,
          explanation: "will-change tells the browser to prepare a composite layer for the property in advance, reducing computation during the actual animation. Use it sparingly."
        },
        {
          question: "Which approach to handling z-index values is most maintainable?",
          options: ["Use random high numbers like 9999", "Define z-index values as CSS custom properties with named semantic values", "Never use z-index", "Set all z-index values to !important"],
          correctIndex: 1,
          explanation: "Defining z-index as named custom properties (--z-dropdown: 100; --z-modal: 200;) creates a clear z-index scale that is easy to understand and adjust."
        },
        {
          question: "What does `contain: layout` on a component do for performance?",
          options: ["Prevents the component from being laid out", "Tells the browser that layout changes inside this element cannot affect elements outside it", "Forces the component into a fixed layout", "Hides overflow content"],
          correctIndex: 1,
          explanation: "contain: layout creates a layout containment boundary, telling the browser that internal layout changes do not affect the outside, enabling more targeted layout recalculations."
        }
      ]
    }
  ]
};
