#Why Lexical
---
### Difference between draft and lexical
- Draft.js was built a long time ago when many of the concerns around making contentEditable work stemmed from patching browser-support. Today, it's nowhere near as bad. We can leverage modern events and we can try and tackle things from a different point of view. 
- One of the core things we've tried to do is make the developer experience and performance better. DraftJS pulled in a lot of JavaScript and much of it was hard to reason with because of the lack of types. ImmutableJS just didn't scale how we would have liked it to, and from our experience, developers didn't really like using it all that much.  
- DraftJS also had a block based approach, which quickly fell apart when you wanted to do something more complex. Not to mention compatibility with React 18+ and the countless issues with having to depend on ReactDOM for rendering when fighting with browser extensions that want to take over control of the DOM from Draft.

With things in mind, we looked at how we could keep the good ideas from Draft, Slate, ProseMirror and also invent some new ideas of our own. 

- Lexical doesn't have any dependencies, so you can use it with Svelte or Solid (once their bindings have been created), or any other framework of your choice. 
- Lexical also doesn't need ImmutableJS, which means the APIs are fully typed in Flow and TypeScript, reducing issues. 
- Lexical is also around 22kb gzip+min, so it's far smaller than Draft. 
- Typing performance in our testing is around 30-70% faster compared to Draft.
- Lexical also treat its own EditorState as the source of truth, use DOM MutationObservers to ensure the DOM matches the EditorState at all times. We do allow external mutations from things like spellcheckers update Lexical – otherwise people wouldn't be able to use Grammarly and other tools with Lexical. However, that's really constrained so that they don't overreach.
- Lexical also has the notion of double-buffering. When you update Lexical, or use a node transform, you're actually mutating the "work in progress" EditorState. Once Lexical feels that the EditorState is ready, it will commit it to the DOM, and that EditorState will become immutable and will reflect what you see on the page.
- It is in production at Facebook. We're slowly rolling out to more surfaces, replacing our existing DraftJS implementations as we go. We've noticed a big improvement internally from doing so, both in terms of less bugs but also performance and accessibility.
