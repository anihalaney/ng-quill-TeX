# ng-quill-Tex
Angular Quill library with Math quill and more


## Features

- Add Math equation using math quill
- Custom image upload and resize image

## How to use 

- Create dist file
```
    npm run package  // create dist

```

-- copy and past dist folder into your project root folder


-- Install ng-quill-tex into your project

```
   npm install './dist/ng-quill-tex/ng-quill-tex-0.0.1.tgz'

```

## Setup

**step 1:** add css

- If you are using angular-cli you can add it to your angular.json

```ts
"styles": [
  "styles.scss",
    "./node_modules/ng-quill-tex/assets/theme.css" // try adding '../' if you're using angular cli before 6
]
```

**step 2:** add NgQuillTexModule to app NgModule

```typescript

@NgModule({
  declarations: [],
  imports: [ NgQuillTexModule],
  providers: [],
  bootstrap: []
})
export class AppModule { }

```

## Use

```typescript

// Math quill options
 mathOptions = {
    quill_options: {
      maths: [{
        cmd: 'sqrt', // Math quill 
        name: 'Square Root',
        url: '' // Image url of maths function
      },
      {
        cmd: 'pm',
        name: 'Plus Minus',
        url: '' // Image url of maths function
      },
      ]
    }
  }


// quil config options 
quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block', 'image'],
        ['mathEditor']
      ],
      handlers: {
        // handlers object will be merged with default handlers object
        'mathEditor': () => {
        }
      },
    },
    mathEditor: { mathOptions: this.mathOptions },
    blotFormatter: {},
    syntax: true
  };

// Text change in quill editor
 onTextChanged(text) {
    console.log('text', text);
 }

// Image Upload
  fileUploaded(quillImageUpload: QuillImageUpload) {
    // Image upload in code in server side
    console.log(quillImageUpload.file);
    quillImageUpload.setImage('https://dummyimage.com/50/000/fff');
  }

```


```html

<div>
    <ng-quill-tex [modules]="quillConfig" (textChanged)="onTextChanged($event)" 
    (fileUploaded)="fileUploaded($event)" [imageUrl]="quillImageUrl" [group]="formGroup" [controlName]="'controlName'">
    </ng-quill-tex>  
</div>

// insert js and css in index.html for support math quill and highlighter to support code block

    // Include jquery, katex and math quill css and js if want suppport maths feature
    // Include highlight css and js if want to support code block
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/a11y-light.min.css" />

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.css" integrity="sha384-8QOKbPtTFvh/lMY0qPVbXj9hDh+v8US0pD//FcoYFst2lCIf0BmT58+Heqj0IGyx" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.js" integrity="sha384-2BKqo+exmr9su6dir+qCw08N2ZKRucY4PrGQPPWU1A7FtlCGjmEGFqXCv5nyM5Ij" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>

```

## Options

### modules

 Configuration of quill toolbar and handlers


### imageUrl

 image url of uploaded image


### group

  formGroup name  // Optional


### controlName

   Form control name // Optional