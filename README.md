# E-Commerce Web Application using React JS & Tensorflow

### Overview
<ul>
  <li>Dashboard style e-commerce website</li>
  <li>Responsive layout</li>
  <li>No CSS libraries</li>
  <li>Using Styled Components</li>
  <li>React Context API</li>
  <li>Tensorflow MobileNet Image Classifier for searching purposes</li>
</ul>

### CodeSandBox Demo

<a href="https://codesandbox.io/s/festive-chatterjee-ocwwu?file=/src/App.js" target="_blank"> Check this out </a>
<br>
All the style is written using styled-components in .js file.
<br>
Svg illustration are contributed by <a href="https://undraw.co/illustrations" target="_blank"> Undraw </a>
<br>

### Searching Process

The search bar allows the input of product name, brand, colour and image address.
<br>
<br>
While inputting product name, brand and colour, the webpage directly routes you to the product page, and the array of a specific item is being displayed.
<br>
<br>
While inputting the image address, the image identification box directly pops up using a particular javascript regular expression. You can then press the identify image button; within the 20ms interference time of the MobileNet v2 model, an array of 3 prediction results are being displayed by the probability.
<br>
<br>
There are particular image URL blocked by the cross-origin policy (CORS policy). The user can also provide an image file input to the browser for image classification.
<br>

### Brief Intro of Tensorflow JS MobileNet

MobileNet-v2 is a convolutional neural network that is 53 layers deep. You can load a pre-trained version of the network trained on more than a million images from the ImageNet database. The pre-trained network can classify images into 1000 object categories, such as keyboard, mouse, pencil, and many animals. As a result, the network has learned rich feature representations for a wide range of images. 

MobileNet-v2 image classification for javascript from Tensorflow JS library provides eye-opening interactivity for the users or clients without any installation. This is the model that runs directly in the browser, and the data input stays only at the client side; this significantly secures the privacy of the clients or users. Accurate results are provided for the users in the vast decrease in time(20ms interference time) and better performance experience than VGG-16(OxfordNet). The model can determine even the species of the animal.

