import React, { type ComponentPropsWithoutRef } from "react";
import Modal from "@/app/components/Modal/Modal";
import MarkdownPreview from "@/app/components/MarkdownPreview/MarkdownPreview";
import "./style.css";

export default function ModalMarkdownInfo({ ...props }: ComponentPropsWithoutRef<"dialog">) {
  return (
    <Modal {...props}>
      <hgroup className="modal-markdown-info-heading">
        <h2>How to use markdown?</h2>
        <p>Just follow the examples below.</p>
      </hgroup>

      <main className="modal-markdown-info-main-content">
        <article>
          <h3 className="modal-markdown-info-heading">Headings:</h3>

          <MarkdownExample markdownText="# This is a level 1 heading" />

          <hr />

          <MarkdownExample markdownText="## This is a level 2 heading" />

          <hr />

          <MarkdownExample markdownText="### This is a level 3 heading" />

          <hr />

          <MarkdownExample markdownText="#### This is a level 4 heading" />

          <hr />

          <MarkdownExample markdownText="##### This is a level 5 heading" />

          <hr />

          <MarkdownExample markdownText="###### This is a level 6 heading" />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Text elements:</h3>

          <MarkdownExample markdownText="plain text" />

          <hr />

          <MarkdownExample markdownText="*italic text*" />

          <hr />

          <MarkdownExample markdownText="_italic text_" />

          <hr />

          <MarkdownExample markdownText="**bold text**" />

          <hr />

          <MarkdownExample markdownText="__bold text__" />

          <hr />

          <MarkdownExample markdownText="***bold and italic text***" />

          <hr />

          <MarkdownExample markdownText="___bold and italic text___" />

          <hr />

          <MarkdownExample markdownText="~~strikethrough text~~" />

          <hr />

          <MarkdownExample markdownText="`code text`" />

          <hr />

          <MarkdownExample markdownText="[Colored text[color: green]]" />

          <hr />

          <MarkdownExample markdownText="[Changed size[size: 20]] by default in `px`." />

          <hr />

          <MarkdownExample markdownText="[Changed font size and color[color: #ffa500, size: 1.5em]]" />

          <hr />

          <MarkdownExample markdownText="It is possible to combine it with ~***`[other[color: #ffa500, size: 14px]]`***~ elements. It must be the deepest nested element." />

          <hr />

          <MarkdownExample
            markdownText={`
**If you have very long word that doesn't fit in the container, you can use \`&shy;\` to enforce breaking the word with a hyphen.**
It would break the word with \`-\` only if it doesn't fit in the container.
You&shy;Would&shy;See&shy;Word&shy;Breaking&shy;Only&shy;If&shy;It&shy;Doesn't&shy;Fit&shy;In&shy;The&shy;Container
          `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Links:</h3>

          <MarkdownExample markdownText="www.example.com" />

          <hr />

          <MarkdownExample markdownText="https://example.com" />

          <hr />

          <MarkdownExample markdownText="<https://example.com>" />

          <hr />

          <MarkdownExample markdownText="~**https://example.com**~" />

          <hr />

          <MarkdownExample markdownText="[Custom **link** ~text~](https://example.com)" />

          <hr />

          <MarkdownExample
            markdownText={`
You can optionally add a \`title\` for a link. [Custom link](https://example.com "Example title for link").
**This will appear as a tooltip when the user hovers over the link.**
            `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
To quickly turn an email address into a link, enclose it in angle brackets. <example@exmaple.com>
            `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
To create a link with a phone number add the "**tel**" prefix before the phone number:
[Some example phone number](tel+123456789 "Call me")
            `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Layouts:</h3>

          <MarkdownExample
            markdownText={`
To go to the next line **enter an empty line**

*or* **add two spaces at the end of the line**.  
Next line.
          `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
>To create [blockquotes[size: 1.1em]] use the greater than sign.
            `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
> *Blockquotes* can contain multiple paragraphs.
>
> Add a **\`>\`** on the **blank** lines between the paragraphs.
            `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
> *[Blockquotes[color: orangered]]* can be nested.
>
>> Add a **\`>>\`** in front of the paragraph you want to nest.
            `}
          />

          <MarkdownExample
            markdownText={`
To create horizontal rule use three or more of the following characters:
**Triple dash \`-\`**

---

**Or triple asterisks  \`*\`**

***

**Or triple underscore \`_\`**

___

          `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Lists:</h3>

          <MarkdownExample
            markdownText={`
* Lit item 1
* List [item[color:hsl(84.6,70.4%,47.6%)]] 2
* __List item bold__
                    `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
1. List item 1
2. *List item italic*
3. ~List item strikethrough~
                    `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
1. List item 1
2. List item 2
3. ***List item with nested list***
    1. List item 3.1
    2. ~***\`List item 3.2 italic, bolded, strikethrough and code\`***~
                    `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Checkboxes:</h3>

          <MarkdownExample
            markdownText={`
* [ ] Unchecked
* [x] [Checked[color:hsl(160,100%,25%), size: 1.25em]]
                    `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
1. [ ] **Unchecked** ordered list item
2. [x] **~Checked ordered list item~**
                    `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Tables:</h3>

          <MarkdownExample
            markdownText={`
| Header 1 | [Header 2[color: red]] | Header 3 |
| -------- | ---------------------- | -------- |
| cell 1   | cell 2                 | cell 3   |
| cell 4   | cell 5                 | cell 6   |
        `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
| aligned center             | aligned left             | aligned default             | aligned right                |
| :------------------------: | :----------------------- | --------------------------- | ---------------------------: |
| super very long cell       | ~strikethrough cell~     | *pipe symbol:* &#124;       | *italic cell*                |
| **strong cell**            | \`some code\`              | [link](https://example.com) | ***strong and italic cell*** |
        `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Code blocks:</h3>

          <MarkdownExample
            markdownText={`
\`\`\`
// This is a code block without any styles
[// It is possible to change font size and color on code blocks without any programming languages styles[color: red, size: .75em]]
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Call the function
greet("world");
\`\`\`
        `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
    // Instead of using triple backticks, you can indent the code block by 4 spaces
    function greet(name) {
      console.log("Hello, " + name + "!");
    }

    // Call the function
      greet("world");
        `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
\`\`\`javascript
// This is a simple JavaScript function
function greet(name) {
  console.log("Hello, " + name + "!");
}

// Call the function
greet("world");
\`\`\`
  `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
\`\`\`python
# This is a simple Python function
def greet(name):
  print("Hello, " + name + "!")

# Call the function
greet("world")
\`\`\`
  `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
\`\`\`java
// This is a simple Java program
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
\`\`\`
  `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Escaping Backticks</h3>

          <MarkdownExample
            markdownText={`
\`\`If you want to use \`backticks\` in your text you can escape it by enclosing the word or phrase in double \`backticks\`.\`\`
            `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Images:</h3>

          <MarkdownExample
            markdownText={`
![Alt text](https://images.unsplash.com/photo-1709318305042-16d0b74554d1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDMzMDgyMw&ixlib=rb-4.0.3&q=80&w=400 "Optional title")
            `}
          />

          <hr />

          <MarkdownExample
            markdownText={`
**Image as a link:**
[![Alt text](https://images.unsplash.com/photo-1709318305042-16d0b74554d1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDMzMDgyMw&ixlib=rb-4.0.3&q=80&w=400 "Click to open in new tab")](https://images.unsplash.com/photo-1709318305042-16d0b74554d1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDMzMDgyMw&ixlib=rb-4.0.3&q=80&w=400)
            `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Math:</h3>

          <MarkdownExample
            markdownText={`
$v^2$
$v_2$

Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following equation.
$$
L = \\frac{1}{2} \\\rho v^2 S C_L
$$

            `}
          />
        </article>

        <br />

        <article>
          <h3 className="modal-markdown-info-heading">Escaping characters:</h3>

          <MarkdownExample
            markdownText={`
To escape a character, add a \` \\\ \` backslash before the character:

\\*not bolded*
\\*not bolded | **this fragment is bolded***

\\_not italicized_


\\# not a heading

---

**Symbols that can be escaped:**
> \\\ \\\` \\* \\_ \\[ \\] \\( \\) \\{ \\} \\< \\> \\# \\. \\! \\~ \\| \\$
            `}
          />
        </article>
      </main>
    </Modal>
  );
}

function MarkdownExample({ markdownText }: { markdownText: string }) {
  return (
    <div className="modal-markdown-info-example">
      <code aria-label="Markdown example">{markdownText}</code>

      <MarkdownPreview markdownText={markdownText} />
    </div>
  );
}
