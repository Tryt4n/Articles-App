import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Node, Parent } from "unist";
import type { NodeType } from "./types";

/**
 * A custom plugin for the unified processor that processes the tree and adds custom nodes
 * for text that matches the specified patterns
 * @returns A function that takes a tree (Node) as an argument
 *
 * The plugin looks for text nodes that match the following patterns:
 * - `This is a [custom text [color: red, size: 20px] text] example.`
 * - `This is a [custom text [size: 20px, color: red]] example.`
 * - `This is a [custom text [color: rgba(0, 0, 0, 0.5), size: 20px]] example.`
 * - `This is a [custom text [size: 20px, color: rgba(0, 0, 0, 0.5)]] example.`
 *
 * The plugin then replaces the matched text with a new 'custom' node that contains the matched text
 * and the specified color and size as properties
 *
 * For example, the first pattern would be replaced with the following node:
 * ```html
 * <p>This is a <span style="color: red; font-size: 20px;">custom text</span> example.</p>
 * ```
 */

export default function customPlugin() {
  // The function returns another function that takes a tree (Node) as an argument
  return (tree: Node) => {
    // Visit each 'text' node in the tree
    visit(tree, "text", (node: NodeType, index: number, parent: Parent) => {
      // Define regular expressions to match the desired text patterns
      // Each regex is designed to capture different parts of the matched string into groups
      // The groups are then accessed using the match array in the following code
      const regex1 = /\[\s*([^\]]+)\s*\[\s*(color:\s*([^,]+)(,\s*size:\s*([^\]]+))?)?\s*\]\s*\]/g;
      const regex2 = /\[\s*([^\]]+)\s*\[\s*(size:\s*([^,]+)(,\s*color:\s*([^\]]+))?)?\s*\]\s*\]/g;
      const regex3 =
        /\[\s*([^\]]+)\s*\[\s*(color:\s*([^,]+(\([^)]*\))?)(,\s*size:\s*([^\]]+))?)?\s*\]\s*\]/g;
      const regex4 = /\[\s*([^\]]+)\s*\[\s*(size:\s*([^,]+)(,\s*color:\s*([^\]]+))?)?\s*\]\s*\]/g;

      let match;
      let color = null;
      let size = null;
      let regex;

      // Check which regex matches the node's value and extract color and size
      // The exec() method returns an array with the whole matched string at index 0, and each captured group at subsequent indices
      // match[1] contains the first captured group, which is the text to be formatted
      // match[3] and match[5] contain the color and size values respectively for regex1
      // match[3] and match[5] contain the size and color values respectively for regex2
      // match[3] and match[6] contain the color and size values respectively for regex3
      // match[3] and match[5] contain the size and color values respectively for regex4
      if ((match = regex1.exec(node.value)) !== null) {
        color = match[3] || null;
        size = match[5] || null;
        regex = regex1;
      } else if ((match = regex2.exec(node.value)) !== null) {
        size = match[3] || null;
        color = match[5] || null;
        regex = regex2;
      } else if ((match = regex3.exec(node.value)) !== null) {
        color = match[3] || null;
        size = match[6] || null;
        regex = regex3;
      } else if ((match = regex4.exec(node.value)) !== null) {
        size = match[3] || null;
        color = match[5] || null;
        regex = regex4;
      }

      // If a match was found
      if (match) {
        // Split the node's value into the part before the match, the match, and the part after the match
        const before = node.value.slice(0, match.index);
        const after = node.value.slice(match.index + match[0].length);

        const nodesToInsert = [];
        // If there is text before the match, add it as a new text node
        if (before) {
          nodesToInsert.push({ type: "text", value: before });
        }

        // If size is specified and does not contain a unit, add 'px' to it as a default
        if (size && !size.match(/[a-z]/i)) {
          size += "px";
        }

        // Add a new 'custom' node with the matched text and the specified color and size
        nodesToInsert.push(h("custom", { color: color, fontSize: size }, match[1]));

        // If there is text after the match, add it as a new text node
        if (after) {
          nodesToInsert.push({ type: "text", value: after });
        }

        // Replace the original node with the new nodes
        parent.children.splice(index, 1, ...nodesToInsert);
      }
    });
  };
}
