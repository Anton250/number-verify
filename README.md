# number-verify
## Description
Number-verify is a simple web component that used to check phone numbers. You can use it for checking validation or for user authentication.
## Getting started
First of all you need to clone this repository and move file number-verify.js to your project with:
```bash
$ git clone https://github.com/Anton250/number-verify
$ cd number-verify
$ mv number-verify.js /link/to/your/project/
```
Then you need to include this .js file and component that allows us to use custom html-tags in the start of your page's body:
```html
<script src="https://cdn.rawgit.com/webcomponents/webcomponentsjs/v0.7.24/webcomponents-lite.js"></script>
<script src="number-verify.js"></script>
```
## Using with HTML tag
To use this component with html-tag you need to write attribute named 'mask'.

> ### Values of mask:
> - 'I' - input for one digit
> - '*' - gray block with symbol "●"
> - &lt;digit&gt; - gray block with digit
> - &lt;not digit&gt; - symbol just showing

```html
<!--Just write this html-tag where you want to use it-->
<number-verify mask="+9(890)II9-**-***" number-error-text="Your error text"></number-verify>
```
**number-error-text** is an attribute that used to set the error text for invalid input.
## Using with JavaScript
Also you can create number-verify object in your JavaScript code:
```js
const mask = "+9(890)II9-**-***";
var number-verify = new number_verify();
number_verify.setMask(mask);//this method sets the mask
document.body.appendChild(number_verify);
```
## Methods
- `.setMask(mask)` - method that sets the mask. Where mask is string with mask [values](#values-of-mask).
- `.setCellIncorrect(position)` - method that sets cell in incorrect position (red border) and shows the error text by default: `Неверный номер, попробуйте ещё раз`. Where parameter position is position of input cell that you want to show like incorrect.
- `.setErrorText(text)` - method that sets error text.
- `.clearAll()` - method that clears all cells and error messages.

