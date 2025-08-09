---
layout: index
title: Index
navigation: true
---

<table class="table-index">
  <tr>
    <th class="table-topic"></th>
    <th>Essays</th>
    <th>Projects</th>
    <th>Links</th>
    <th>More Links</th>
  </tr>
  <tr>
    <th class="table-topic">Standards</th>
    <td>
      <div><a href="standards/base-uid">Compact Base64-first UIDs</a></div>
      <div><a href="standards/defending-home">Defending <kbd>$HOME</kbd></a></div>
      <div><a href="standards/xdg-migration-status">XDG Migration Status</a></div>
    </td>
    <td>
      <section id="dirs-dev" class="dirs-dev">📂 <a href="https://dirs.dev">The Dirs Project</a> 📂
        <ul>
          <li><a href="talks/rust-meetup-2018">Talk</a></li>
          <li><a href="https://codeberg.org/dirs/directories-jvm/">directories-jvm</a></li>
          <li><a href="https://codeberg.org/dirs/directories-rs/">directories-rs</a> &amp; <a href="https://codeberg.org/dirs/dirs-rs/">dirs-rs</a></li>
        </ul>
      </section>
    </td>
    <td>
      <div><a href="https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/">Unicode &amp; Character Sets</a></div>
      <div><a href="https://googleprojectzero.blogspot.de/2016/02/the-definitive-guide-on-win32-to-nt.html">Path handling on Windows</a></div>
    </td>
    <td>
      <div><a href="https://yakking.branchable.com/posts/falsehoods-programmers-believe-about-file-paths/">Falsehoods about paths</a></div>
      <div><a href="https://www.cs.tau.ac.il/~nachum/calendar-book/index.shtml">Calendrical calculations</a></div>
    </td>
  </tr>
  <tr>
    <th class="table-topic">Languages</th>
    <td>
      <section id="design-principles"><i>Design Principles:</i>
        <ul>
          <li><a href="languages/modern-minimal">Modern &amp; Minimal</a></li>
          <li><a href="languages/familiarity">Familiarity</a></li>
        </ul>
      </section>
      <section id="easy-wins"><i>Easy wins:</i>
        <ul>
          <li><a href="languages/useful-syntax-sugar">Useful Syntax Sugar</a></li>
          <li><a href="languages/stop-using-angle-brackets-for-generics">Use <kbd>[]</kbd>, not <kbd><></kbd> for Generics</a></li>
          <li><a href="languages/type-annotations">Use<kbd> ident: Type</kbd>,<br/>not<kbd> Type ident</kbd></a></li>
          <li><a href="languages/against-mixed-cased-type-names">Use consistent casing</a></li>
          <li><a href="languages/consistent-keyword-length" class="compact">Use consistent keyword length</a></li>
        </ul>
      </section>
      <section id="simplicity-matters"><i>Simplicity matters:</i>
        <ul>
          <li><a href="languages/unary-operators-are-unnecessary" class="compact">Unnecessary: Unary Operators</a></li>
          <li><a href="languages/binary-operators-are-overused" class="compact">Overused: Binary Operators</a></li>
          <li><a href="languages/annotations-obsolete-modifiers">Obsolete: Modifiers</a>
            <ul>
              <li><a href="languages/annotations-obsolete-modifiers-attempts">Failed Attempts</a></li>
            </ul>
          </li>
          <li><a href="languages/drop-break-and-continue">Drop <kbd>break</kbd> and <kbd>continue</kbd></a></li>
          <li><a href="languages/fields-methods-properties-pick-two">Fields & Methods & Properties? Pick Two!</a></li>
        </ul>
      </section>
      <section id="mistakes-were-made"><i>Mistakes were made:</i>
        <ul>
          <li><a href="languages/popular-but-wrong">Popular, but Wrong</a></li>
          <li><a href="languages/implicit-numeric-conversions" class="compact">Implicit Numeric Conversions</a></li>
          <li><a href="languages/package-objects-in-scala">Package Objects in Scala</a></li>
          <li><a href="languages/design-mistakes-in-rust">Rust's Design Mistakes</a></li>
          <li><a href="languages/rust-struct-initializer-mistake">Struct initialization in Rust</a></li>
          <li><a href="languages/rust-almost-rules">Rust's Almost-Rules</a></li>
        </ul>
      </section>
    </td>
    <td>
      <section id="core-lang" class="core-lang">✨ <a href="https://core-lang.dev">The Core Language</a> ✨
        <ul>
          <li><a href="https://core-lang.dev/about">About</a></li>
          <li><a href="https://core-lang.dev/design">Design</a></li>
          <li><a href="https://core-lang.dev/overview">Overview</a></li>
          <li><a href="https://core-lang.dev/changes">Changes</a></li>
        </ul>
      </section>
      <section id="equality-and-identity"><i>Equality &amp; Identity:</i>
        <ol>
          <li><a href="languages/equality-and-identity-overview">Overview</a></li>
          <li><a href="languages/equality-and-identity-problems">Problems</a></li>
          <li><a href="languages/equality-and-identity-solution">Solution</a></li>
          <li><a href="languages/equality-and-identity-fixing-haskell">Fixing Haskell</a></li>
          <li><a href="languages/equality-and-identity-java">Java</a></li>
          <li>Fixing Rust</li>
          <li>Fixing Swift</li>
        </ol>
      </section>
      <div><a href="languages/comparing-and-sorting">Comparing &amp; Sorting</a></div>
      <section id="unified-condition-expressions"><i>Unified Condition Expressions:</i>
        <ol>
          <li><a href="languages/unified-condition-expressions">Introduction</a></li>
          <li><a href="languages/unified-condition-expressions-implementation">Implementation</a></li>
          <li><a href="languages/unified-condition-expressions-exceptions">Exceptions</a></li>
          <li><a href="languages/unified-condition-expressions-comparison">Comparison with Rust</a></li>
        </ol>
      </section>
      <div><a href="languages/generics">Type Ascriptions &amp; Generics</a></div>
      <section id="naming-conventions"><i>Naming Conventions:</i>
        <ol>
          <li><a href="languages/naming-conventions-creation">Creation</a></li>
          <li><a href="languages/naming-conventions-conversion">Conversion</a></li>
          <li><a href="languages/naming-conventions-option-and-result">Option & Result</a></li>
          <li><a href="languages/naming-conventions-lookup">Lookup</a></li>
          <li><a href="languages/naming-conventions-streaming">Streaming</a></li>
        </ol>
      </section>
      <div><a href="languages/unions">Unions</a></div>
    </td>
    <td>
      <div><a href="https://pointersgonewild.com/2022/05/23/minimalism-in-programming-language-design/">Minimalism in Programming Language Design</a></div>
      <div><a href="https://hillelwayne.com/post/influential-dead-languages/">10 Most(ly dead) Influential Programming Languages</a></div>
      <div><a href="https://madhadron.com/posts/seven_languages.html">7 programming ur-languages</a></div>
      <div><a href="https://wiki.alopex.li/WirthEvolution">Wirth Evolution:<br/>Pascal Modula-2 Oberon</a></div>
      <div><a href="https://lawrencecpaulson.github.io/2022/10/05/Standard_ML.html">Memories: Edinburgh ML to Standard ML</a></div>
      <div><a href="https://osa1.net/posts/2023-04-24-ocaml-thoughts.html">My thoughts on OCaml</a></div>
      <div><a href="https://belkadan.com/blog/tags/swift-regrets/">Swift Regrets</a></div>
      <div><a href="http://download.swift.org/docs/assets/generics.pdf">Compiling Swift Generics</a><sup>pdf</sup></div>
      <div><a href="https://journal.stuffwithstuff.com/2012/12/19/the-impoliteness-of-overriding-methods/">Impoliteness of Overriding</a></div>
      <div><a href="https://pling.jondgoodwin.com/post/cyclone/">Cyclone's Fascinating Influence</a></div>
      <div><a href="https://muxup.com/2023q4/ownership-you-can-count-on">Ownership you can count on</a></div>
      <div><a href="https://pling.jondgoodwin.com/post/semicolon-inference/">Semicolon Inference</a></div>
      <div><a href="https://devblogs.microsoft.com/oldnewthing/20230904-00/?p=108704" class="compact">Shift Larger Than Register Size</a></div>
      <div><a href="https://ericlippert.com/2020/02/27/hundred-year-mistakes/">Hundred year mistakes</a></div>
      <div><a href="https://verdagon.dev/grimoire/grimoire">Memory Safety Approaches</a></div>
    </td>
    <td>
      <div><i class="compact">Syntax Comparisons/Overviews:</i>
        <ol>
          <li><a href="http://rigaux.org/language-study/syntax-across-languages.html">Rigaux</a></li>
          <li><a href="https://pldb.com/lists/keywords.html">PLDB</a></li>
          <li><a href="https://hyperpolyglot.org/">Hyperpolyglot</a></li>
          <li><a href="http://adam.chlipala.net/mlcomp/">Chlipala</a></li>
        </ol>
      </div>
      <div><a href="http://blog.ezyang.com/2014/07/type-classes-confluence-coherence-global-uniqueness/">Type classes: confluence, coherence & global uniqueness</a></div>
      <div><a href="https://eed3si9n.com/dependency-resolver-semantics">Semantics of Dependency Resolvers</a></div>
      <div><a href="https://okasaki.blogspot.com/2008/02/in-praise-of-mandatory-indentation-for.html">In Praise of Mandatory Indentation</a></div>
      <div><a href="https://keleshev.com/parsing-ambiguity-type-argument-v-less-than">Parsing Ambiguity:<br/>Type Argument vs. Less Than</a></div>
      <div><a href="https://www.youtube.com/watch?v=pNhBQJN44YQ">Extreme Cleverness:<br/>Functional Data Structures</a></div>
      <div><a href="https://www.youtube.com/watch?v=8OJ_-L1QcDw" class="compact">Living in a Post-Functional World</a></div>
      <div><a href="https://matklad.github.io/2022/07/10/almost-rules.html">Almost Rules in Rust</a></div>
      <div><a href="https://blaz.is/blog/post/lets-pretend-that-task-equals-thread/">Pretend That Task = Thread?</a></div>
      <div><a href="https://bitbashing.io/async-rust.html">Async Rust Is A Bad Language</a></div>
      <div><a href="https://blog.hugpoint.tech/avoid_async_rust.html">Avoid Async Rust At All Cost</a></div>
      <div><a href="https://typesanitizer.com/blog/errors" class="compact">A treatise on error models for systems programming languages</a></div>
    </td>
  </tr>
  <tr>
    <th class="table-topic">Runtimes</th>
    <td><a href="runtimes/domains-as-cargo-namespaces">Domains as Cargo Namespaces</a></td>
    <td>
      <section id="efficient-memory-use"><i>Efficient Memory Use:</i>
        <ol>
          <li><a href="runtimes/pointer-compression">Pointer Compression</a></li>
          <li><a href="runtimes/header-compression">Header Compression</a></li>
        </ol>
      </section>
    </td>
    <td>
      <div><a href="http://www.wolczko.com/CS294/">Virtual Machines<br/>and Managed Runtimes</a></div>
      <div><a href="https://soft-dev.org/events/vmss16/">Virtual Machines<br/>Summer School 2016</a></div>
      <div><a href="https://carolchen.me/blog/technical/jits-impls/">How JIT Compilers are Implemented and Fast</a></div>
      <div><a href="https://shipilev.net/jvm/anatomy-quarks/">JVM Anatomy Quarks</a></div>
    </td>
    <td>
      <div><a href="https://v8.dev/blog/pointer-compression/">Pointer Compression in V8</a></div>
      <section id="cranelift-backend"><i>Cranelift Backend:</i>
        <ul>
          <li><a href="https://cfallin.org/blog/2020/09/18/cranelift-isel-1/">Instruction Selection</a></li>
          <li><a href="https://cfallin.org/blog/2021/01/22/cranelift-isel-2/">Compiler Efficiency</a></li>
          <li><a href="https://cfallin.org/blog/2021/03/15/cranelift-isel-3/">Correct Register Allocation</a></li>
          <li><a href="https://cfallin.org/blog/2022/06/09/cranelift-regalloc2/">A New Register Allocator</a></li>
        </ul>
      </section>
    </td>
  </tr>
  <tr>
    <th class="table-topic">Interfaces</th>
    <td>
      <div><a href="interfaces/x86-prefixes-and-escape-opcodes-flowchart">x86 prefix & escape flowchart</a></div>
      <div><a href="interfaces/improving-the-xfce-settings-ui">Improving the XFCE Settings UI</a></div>
    </td>
    <td>
      <div><a href="interfaces/improving-the-synaptic-package-manager-ui">Improving the Synaptic<br/>Package Manager UI</a></div>
      <div><a href="interfaces/vertical-tabs-in-firefox">Vertical Tabs in Firefox</a></div>
    </td>
    <td>
      <div><a href="https://www.youtube.com/watch?v=pq1XqP4-qOo">Hybrid Dynamic/Static Linking</a></div>
      <div><a href="https://gankra.github.io/blah/swift-abi/">Dynamic Linking in Swift</a></div>
      <div><a href="https://justine.lol/ape.html">αcτµαlly pδrταblε εxεcµταblε</a></div>
      <div><a href="https://gankra.github.io/blah/c-isnt-a-language/">C Isn't A Language Anymore</a></div>
      <div><a href="https://thephd.dev/to-save-c-we-must-save-abi-fixing-c-function-abi">To Save C, We Must Save ABI</a></div>
      <div><a href="https://cor3ntin.github.io/posts/abi/">The Day The Standard Library Died</a></div>
    </td>
    <td>
      <div><a href="https://outerproduct.net/boring/2021-05-07_abi-wrong.html">Your ABI is Probably Wrong</a></div>
      <div><a href="https://www.microsoft.com/en-us/research/uploads/prod/2020/03/kacc.pdf" class="compact">Kinds Are Calling Conventions</a><sup>pdf</sup></div>
      <section id="ghost-of-unix-past"><i>Ghosts of Unix Past:</i>
        <ol>
          <li><a href="https://lwn.net/Articles/411845/">Design patterns</a></li>
          <li><a href="https://lwn.net/Articles/412131/">Conflated designs</a></li>
          <li><a href="https://lwn.net/Articles/414618/">Unfixable designs</a></li>
          <li><a href="https://lwn.net/Articles/416494/">High-maintenance designs</a></li>
        </ol>
      </section>
      <div>On ELF: <a href="https://kestrelcomputer.github.io/kestrel/2018/01/29/on-elf">Part 1</a> <a href="https://kestrelcomputer.github.io/kestrel/2018/02/01/on-elf-2">Part 2</a></div>
    </td>
  </tr>
  <tr>
    <th class="table-topic">Hardware</th>
    <td>
      <div><a href="hardware/keyboard-design">Keyboard Design</a></div>
      <div><a href="hardware/usb-standard">USB-HID Protocol Evolution</a></div>
    </td>
    <td>
      <div><a href="hardware/keyboard-build">Keyboard Build</a></div>
      <div><a href="hardware/keyboard-setup">Keyboard Setup</a></div>
    </td>
    <td>
      <div><a href="https://os.phil-opp.com/">Writing an OS in Rust</a></div>
      <div><a href="https://gist.github.com/erincandescent/8a10eeeea1918ee4f9d9982f7618ef68">RISC-V: The Middling/Bad/Ugly</a></div>
    </td>
    <td>
      <div><a href="https://lwn.net/Articles/902094/">Linear Address Masking</a></div>
    </td>
  </tr>
</table>
