---
title: Liquid reference
description: >-
  The Liquid reference documents the Liquid tags, filters, and objects that you
  can use to build Shopify themes.
api_name: liquid
source_url:
  html: 'https://shopify.dev/docs/api/liquid'
  md: 'https://shopify.dev/docs/api/liquid.md'
---

# Liquid reference

Liquid is a template language created by Shopify. It's available as an [open source project](https://shopify.github.io/liquid/) on GitHub, and is used by many different software projects and companies.

This reference documents the Liquid tags, filters, and objects that you can use to build [Shopify Themes](https://shopify.dev/themes).

## What is a template language?

A template language allows you to create a single template to host static content, and dynamically insert information depending on where the template is rendered. For example, you can create a product template that hosts all of your standard product attributes, such as the product image, title, and price. That template can then dynamically render those attributes with the appropriate content, depending on the current product being viewed.

***

## Variations of Liquid

The variation of Liquid in this reference extends the open-source version of Liquid for use with [Shopify themes](https://shopify.dev/themes). It includes tags, filters, and objects that can be used to render objects specific to Shopify stores and storefront functionality.

Shopify also uses slightly different versions of Liquid to render dynamic content for the following features. These variations aren’t included in this reference.

[Notification templates](https://help.shopify.com/en/manual/orders/notifications/email-variables)

[Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/reference/variables#liquid-variables)

[Order printer templates](https://help.shopify.com/en/manual/fulfillment/managing-orders/printing-orders/shopify-order-printer/liquid-variables-and-filters-reference)

[Packing slip templates](https://help.shopify.com/en/manual/orders/packing-slips-variable-list)

***

## Liquid basics

Liquid is used to dynamically output objects and their properties. You can further modify that output by creating logic with tags, or directly altering it with a filter. Objects and object properties are output using one of six basic data types. Liquid also includes basic logical and comparison operators for use with tags.

[Navigate to - Basics](https://shopify.dev/docs/api/liquid/basics)

```liquid
<title>
  {{ page_title }}
</title>
{% if page_description -%}
  <meta name="description" content="{{ page_description | truncate: 150 }}">
{%- endif %}
```

##### Code

```
<title>
  {{ page_title }}
</title>
{% if page_description -%}
  <meta name="description" content="{{ page_description | truncate: 150 }}">
{%- endif %}
```

## Output

```html
<title>
  Health potion
</title>
<meta name="description" content="Are you low on health? Well we've got the potion just for you! Just need a top up? Almost dead? In between? No need to worry because we have a ...">
```

***

## Defining logic with tags

Liquid tags are used to define logic that tells templates what to do.

Tags are wrapped with curly brace percentage delimiters `{% %}`. The text within the delimiters is an instruction, not content to render.

In the example to the right, the `if` tag defines the condition to be met. If `product.available` returns `true`, then the price is displayed. Otherwise, the “sold out” message is shown.

`{% %}`

To nest multiple tags inside one set of delimiters, use the [`liquid`](https://shopify.dev/docs/api/liquid/tags/liquid) tag.

```liquid
{% if product.available %}
  Price: $99.99
{% else %}
  Sorry, this product is sold out.
{% endif %}
```

##### Code

```
{% if product.available %}
  Price: $99.99
{% else %}
  Sorry, this product is sold out.
{% endif %}
```

##### Data

```
{
  "product": {
    "available": true
  }
}
```

## Output

```html
Price: $99.99
```

### Tags with parameters

Some tags accept parameters: either required or optional. For example, the `for` tag takes an optional `limit` parameter to stop the loop at a specific index.

```liquid
{% assign numbers = '1,2,3,4,5' | split: ',' %}


{% for item in numbers limit:2 -%}
  {{ item }}
{% endfor %}
```

##### Code

```
{% assign numbers = '1,2,3,4,5' | split: ',' %}

{% for item in numbers limit:2 -%}
  {{ item }}
{% endfor %}
```

## Output

```html
1
2
```

***

## Modifying output with filters

Liquid filters modify the output of variables and objects.

To filter the output of a tag, use the pipe character `|`, followed by the filter. In this example, `product` is the object, `title` is its property, and `upcase` is the filter.

```liquid
{% # product.title -> Health potion %}


{{ product.title | upcase }}
```

##### Code

```
{% # product.title -> Health potion %}

{{ product.title | upcase }}
```

##### Data

```
{
  "product": {
    "title": "Health potion"
  }
}
```

## Output

```html
HEALTH POTION
```

### Filters with parameters

Many filters accept parameters that adjust their output. Some parameters are required, others are optional.

```liquid
{% # product.title -> Health potion %}


{{ product.title | remove: 'Health' }}
```

##### Code

```
{% # product.title -> Health potion %}

{{ product.title | remove: 'Health' }}
```

##### Data

```
{
  "product": {
    "title": "Health potion"
  }
}
```

## Output

```html
potion
```

### Using multiple filters

Multiple filters can be used on one output. They're applied from left to right.

```liquid
{% # product.title -> Health potion %}


{{ product.title | upcase | remove: 'HEALTH' }}
```

##### Code

```
{% # product.title -> Health potion %}

{{ product.title | upcase | remove: 'HEALTH' }}
```

##### Data

```
{
  "product": {
    "title": "Health potion"
  }
}
```

## Output

```html
POTION
```

***

## Referencing objects

Liquid objects represent variables that you can use to build your theme. Object types include, but aren't limited to:

* Store resources, such as a collection or product and its properties
* Standard content that is used to power Shopify themes, such as `content_for_header`
* Functional elements that can be used to build interactivity, such as `paginate` and `search`

Objects might represent a single data point, or contain multiple properties. Some products might represent a related object, such as a product in a collection.

`{{ }}`

Double curly brace delimiters denote an output.

### Usage

To output an object, wrap it in curly brace delimiters `{{ }}`.

To output an object's property, use dot notation. This example outputs the `product` object's `title` property.

```liquid
{{ product.title }}
```

##### Code

```
{{ product.title }}
```

##### Data

```
{
  "product": {
    "title": "Health potion"
  }
}
```

## Output

```html
Health potion
```

### Object access

Objects can be accessed in three ways:

* **Globally**: Available in any Liquid file, excluding [checkout.liquid](https://shopify.dev/themes/architecture/layouts/checkout-liquid) and [Liquid asset files](https://shopify.dev/themes/architecture#assets)
* **In templates**: Available in specific templates and their sections or blocks. For example, the [`product`](https://shopify.dev/docs/api/liquid/objects/product) object in a [product template](https://shopify.dev/themes/architecture/templates/product)
* **Through parent objects**: Returned as properties of other objects. For example, [`article`](https://shopify.dev/docs/api/liquid/objects/article) objects through [`articles`](https://shopify.dev/docs/api/liquid/objects/articles) or [`blog`](https://shopify.dev/docs/api/liquid/objects/blog)

Check each object's documentation to see how it can be accessed.

### Creating variables

To create your own variables, use variable tags like [`assign`](https://shopify.dev/docs/api/liquid/tags/assign) or [`capture`](https://shopify.dev/docs/api/liquid/tags/capture). Syntactically, Liquid treats variables the same as objects.

```liquid
{% assign my_variable = 'My custom string.' %}
{{ my_variable }}
```

##### Code

```
{% assign my_variable = 'My custom string.' %}
{{ my_variable }}
```

## Output

```html
My custom string.
```

***

## Resources & tools

[Liquid Cheat Sheet\
\
](https://www.shopify.com/partners/shopify-cheat-sheet)

[A simple reference guide to the Liquid language.](https://www.shopify.com/partners/shopify-cheat-sheet)

[Theme Check\
\
](https://shopify.dev/themes/tools/theme-check)

[Command line-based linter for themes. Also comes as an official Visual Studio Code extension.](https://shopify.dev/themes/tools/theme-check)

[Shopify CLI for Themes\
\
](https://shopify.dev/themes/tools/cli)

[A powerful command-line tool for building Shopify themes, and exploring Liquid code in a REPL interface.](https://shopify.dev/themes/tools/cli)

[Open source liquid\
\
](https://github.com/Shopify/liquid)

[Liquid is an open source project on GitHub.](https://github.com/Shopify/liquid)

***

---
title: Liquid basics
description: >-
  The basic concepts that you need to effectively interact with Liquid tags,
  filters, and objects.
api_name: liquid
source_url:
  html: 'https://shopify.dev/docs/api/liquid/basics'
  md: 'https://shopify.dev/docs/api/liquid/basics.md'
---

# Basics

The following are basic concepts that you need to effectively interact with Liquid tags, filters, and objects.

## Object handles

Objects that represent store resources, such as products, collections, articles, and blogs, have handles for identifying an individual resource. The handle is used to build the URL for the resource, or to return properties for the resource.

Other objects like `linklists`, `links`, and `settings` also have handles.

### Creating and modifying handles

Handles are automatically generated based on the resource title. They follow a set of rules:

* Handles are always lowercase
* Whitespace and special characters are replaced with a hyphen `-`.
* If there are multiple consecutive whitespace or special characters, then they're replaced with a single hyphen.
* Whitespace or special characters at the beginning are removed.

Handles need to be unique, so if a duplicate title is used, then the handle is auto-incremented by one. For example, if you had two products called `Potion`, then their handles would be `potion` and `potion-1`.

After a resource has been created, changing the resource title doesn't update the handle.

You can modify a resource's handle within the Shopify admin. This can be done either in the Handle or the Edit website SEO sections, depending on the resource. If you reference resources by their handle, then be sure to update those references when modifying handles.

***

Note

Individual links from `linklists` have handles based on their titles. These handles can't be modified directly. Individual settings, from `settings_schema.json`, sections, or blocks, get their handle from their `id` property.

***

```liquid
{{ product.title | handle }}
```

##### Code

```
{{ product.title | handle }}
```

##### Data

```
{
  "product": {
    "title": "Health potion"
  }
}
```

## Output

```html
health-potion
```

### Referencing handles

All objects that have a handle have a `handle` property. For example, you can output a product's handle with `product.handle`. You can reference an object, from within its parent object, by its handle in two ways:

* Square bracket notation `[ ]`: Accepts a handle wrapped in quotes `'`, a Liquid variable, or an object reference.
* Dot notation `.`: Accepts a handle without quotes.

***

Note

Referencing an object by its handle is similar to [referencing array elements by their index](https://shopify.dev/docs/api/liquid/basics#array).

***

```liquid
'About us' page URL: {{ pages['about-us'].url }}
Enable product suggestions: {{ settings.predictive_search_enabled }}
```

##### Code

```
'About us' page URL: {{ pages['about-us'].url }}
Enable product suggestions: {{ settings.predictive_search_enabled }}
```

##### Data

```
{
  "settings": {
    "predictive_search_enabled": true
  }
}
```

## Output

```html
'About us' page URL: /pages/about-us
Enable product suggestions: true
```

***

## Logical and comparison operators

Liquid supports basic logical and comparison operators for use with conditional tags: [`case`](https://shopify.dev/docs/api/liquid/tags/case), [`else`](https://shopify.dev/docs/api/liquid/tags/conditional-else), [`if`](https://shopify.dev/docs/api/liquid/tags/if) and [`unless`](https://shopify.dev/docs/api/liquid/tags/unless).

| Operator | Function |
| - | - |
| `==` | equals |
| `!=` | does not equal |
| `>` | greater than |
| `<` | less than |
| `>=` | greater than or equal to |
| `>=` | greater than or equal to |
| `<=` | less than or equal to |
| `or` | Condition A or Condition B |
| `and` | Condition A and Condition B |
| `contains` | Checks for strings in strings or arrays |

#### contains

You can use `contains` to check for the presence of a string within an array, or another string. You can’t use `contains` to check for an object in an array of objects.

```liquid
{% if product.tags contains 'healing' %}
  This potion contains restorative properties.
{% endif %}
```

##### Code

```
{% if product.tags contains 'healing' %}
  This potion contains restorative properties.
{% endif %}
```

##### Data

```
{
  "product": {
    "tags": [
      "healing"
    ]
  }
}
```

## Output

```html
This potion contains restorative properties.
```

### Order of operations

When using more than one operator in a tag, the operators are evaluated from right to left, and you can’t change this order.

***

Caution

Parentheses `()` aren’t valid characters within Liquid tags. If you try to include them to group operators, then your tag won’t be rendered.

***

```liquid
{% unless true and false and false or true %}
  This evaluates to false, since Liquid checks tags like this:


  true and (false and (false or true))
  true and (false and true)
  true and false
  false
{% endunless %}
```

##### Code

```
{% unless true and false and false or true %}
  This evaluates to false, since Liquid checks tags like this:

  true and (false and (false or true))
  true and (false and true)
  true and false
  false
{% endunless %}
```

## Output

```html
This evaluates to false, since Liquid checks tags like this:


  true and (false and (false or true))
  true and (false and true)
  true and false
  false
```

***

## Types

Liquid output can be one of six data types.

### string

Any series of characters, wrapped in single or double quotes.

***

Info

You can check whether a string is empty with the `blank` object.

***

### number

Numeric values, including floats and integers.

### boolean

A binary value, either `true` or `false`.

### nil

An undefined value.

Tags or outputs that return `nil` don't print anything to the page. They are also treated as `false`.

***

Note

A string with the characters “nil” is not treated the same as `nil`.

***

### array

A list of variables of any type.

To access all of the items in an array, you can loop through each item in the array using a [`for`](https://shopify.dev/docs/api/liquid/tags/for) or [`tablerow`](https://shopify.dev/docs/api/liquid/tags/tablerow) tag.

You can use square bracket `[ ]` notation to access a specific item in an array. Array indexing starts at zero.

You can’t initialize arrays using only Liquid. You can, however, use the split filter to break a single string into an array of substrings.

### empty

An `empty` object is returned if you try to access an object that is defined, but has no value. For example a page or product that’s been deleted, or a setting with no value.

You can compare an object with `empty` to check whether an object exists before you access any of its attributes.

```liquid
{% unless pages.about-us == empty %}
  <h1>{{ page.title }}</h1>
  <div>
    {{ page.content }}
  </div>
{% endunless %}
```

##### Code

```
{% unless pages.about-us == empty %}
  <h1>{{ page.title }}</h1>
  <div>
    {{ page.content }}
  </div>
{% endunless %}
```

##### Data

```
{
  "page": {
    "content": "<p>Polina's Potent Potions was started by Polina in 1654.</p>\n<p>We use all-natural locally sourced ingredients for our potions.</p>",
    "title": "About us"
  }
}
```

## Output

```html
<h1>About us</h1>
  <div>
    <p>Polina's Potent Potions was started by Polina in 1654.</p>
<p>We use all-natural locally sourced ingredients for our potions.</p>
  </div>
```

***

## Truthy and falsy

All data types must return either `true` or `false`. Those which return `true` by default are called truthy. Those that return `false` by default are called falsy.

| Value | Truthy | Falsy |
| - | - | - |
| `true` | | |
| `false` | | |
| `nil` | | |
| `empty string` | | |
| `0` | | |
| `integer` | | |
| `float` | | |
| `array` | | |
| `empty array` | | |
| `page` | | |
| `empty object` | | |

### Example

Because `nil` and `false` are the only falsy values, you need to be careful how you check values in Liquid. A value might not be in the format you expect, but still be truthy.

For example, empty strings are truthy, so you need to check whether they’re empty with `blank`. `EmptyDrop` objects are also truthy, so you need to check whether the object you’re referencing is `empty`.

```liquid
{% if settings.featured_potions_title != blank -%}
  {{ settings.featured_potions_title }}
{%- else -%}
  No value for this setting has been selected.
{%- endif %}
{% unless pages.recipes == empty -%}
  {{ pages.recipes.content }}
{%- else -%}
  No page with this handle exists.
{%- endunless %}
```

##### Code

```
{% if settings.featured_potions_title != blank -%}
  {{ settings.featured_potions_title }}
{%- else -%}
  No value for this setting has been selected.
{%- endif %}
{% unless pages.recipes == empty -%}
  {{ pages.recipes.content }}
{%- else -%}
  No page with this handle exists.
{%- endunless %}
```

##### Data

```
{
  "settings": {
    "featured_potions_title": null
  }
}
```

## Output

```html
No value for this setting has been selected.
No page with this handle exists.
```

***

## Whitespace control

Even if it doesn't output text, any line of Liquid outputs a line in your rendered content. By including hyphens in your Liquid tag, you can strip any whitespace that your Liquid generates when rendered.

If you want to remove whitespace on only one side of the Liquid tag, then you can include the hyphen on either the opening or closing tag.

```liquid
{%- if collection.products.size > 0 -%}
The '{{ collection.title }}' collection contains the following types of products:


{% for type in collection.all_types -%}
  {% unless type == blank -%}
    - {{ type }}
  {%- endunless -%}
{%- endfor %}
{%- endif -%}
```

##### Code

```
{%- if collection.products.size > 0 -%}
The '{{ collection.title }}' collection contains the following types of products:

{% for type in collection.all_types -%}
  {% unless type == blank -%}
    - {{ type }}
  {%- endunless -%}
{%- endfor %}
{%- endif -%}
```

##### Data

```
{
  "collection": {
    "all_types": [
      "Health",
      "Health & Beauty",
      "Invisibility",
      "Water"
    ],
    "products": [],
    "title": "Sale potions"
  }
}
```

## Output

```html
The 'Sale potions' collection contains the following types of products:


- Health
- Health & Beauty
- Invisibility
- Water
```

***

---
title: "Liquid tags: form"
description: Generates an HTML `<form>` tag, including any required `<input>` tags to submit the form to a specific endpoint.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/form
  md: https://shopify.dev/docs/api/liquid/tags/form.md
---

# form

Generates an HTML `<form>` tag, including any required `<input>` tags to submit the form to a specific endpoint.

Because there are many different form types available in Shopify themes, the `form` tag requires a type. Depending on the form type, an additional parameter might be required. You can specify the following form types:

* [`activate_customer_password`](https://shopify.dev/docs/api/liquid/tags/form#form-activate_customer_password)
* [`cart`](https://shopify.dev/docs/api/liquid/tags/form#form-cart)
* [`contact`](https://shopify.dev/docs/api/liquid/tags/form#form-contact)
* [`create_customer`](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer)
* [`currency`](https://shopify.dev/docs/api/liquid/tags/form#form-currency)
* [`customer`](https://shopify.dev/docs/api/liquid/tags/form#form-customer)
* [`customer_address`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_address)
* [`customer_login`](https://shopify.dev/docs/api/liquid/tags/form#form-customer_login)
* [`guest_login`](https://shopify.dev/docs/api/liquid/tags/form#form-guest_login)
* [`localization`](https://shopify.dev/docs/api/liquid/tags/form#form-localization)
* [`new_comment`](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment)
* [`product`](https://shopify.dev/docs/api/liquid/tags/form#form-product)
* [`recover_customer_password`](https://shopify.dev/docs/api/liquid/tags/form#form-recover_customer_password)
* [`reset_customer_password`](https://shopify.dev/docs/api/liquid/tags/form#form-reset_customer_password)
* [`storefront_password`](https://shopify.dev/docs/api/liquid/tags/form#form-storefront_password)

## Syntax

```oobleckTag
{% form 'form_type' %}
  content
{% endform %}
```

form\_type

The name of the desired form type

content

The form contents

### activate\_customer\_password

## Syntax

```oobleckTag
{% form 'activate_customer_password', article %}
  form_content
{% endform %}
```

Generates a form for activating a customer account. To learn more about using this form, and its contents, refer to the [`customers/activate_account` template](https://shopify.dev/themes/architecture/templates/customers-activate-account#content).

```liquid
{% form 'activate_customer_password' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'activate_customer_password' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/account/activate" accept-charset="UTF-8"><input type="hidden" name="form_type" value="activate_customer_password" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### cart

## Syntax

```oobleckTag
{% form 'cart', cart %}
  form_content
{% endform %}
```

Generates a form for creating a checkout based on the items currently in the cart. The `cart` form requires a [`cart` object](https://shopify.dev/docs/api/liquid/objects/cart) as a parameter. To learn more about using the cart form in your theme, refer to the [`cart` template](https://shopify.dev/themes/architecture/templates/cart#proceed-to-checkout).

```liquid
{% form 'cart', cart %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'cart', cart %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/cart" id="cart_form" accept-charset="UTF-8" class="shopify-cart-form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="cart" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### contact

## Syntax

```oobleckTag
{% form 'contact' %}
  form_content
{% endform %}
```

Generates a form for submitting an email to the merchant. To learn more about using this form in your theme, refer to [Add a contact form to your theme](https://shopify.dev/themes/customer-engagement/add-contact-form).

***

Tip

To learn more about the merchant experience of receiving submissions, refer to [the Shopify Help Center](https://help.shopify.com/manual/online-store/themes/customizing-themes/add-contact-page#view-contact-form-submissions).

***

```liquid
{% form 'contact' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'contact' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/contact#contact_form" id="contact_form" accept-charset="UTF-8" class="contact-form"><input type="hidden" name="form_type" value="contact" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### create\_customer

## Syntax

```oobleckTag
{% form 'create_customer' %}
  form_content
{% endform %}
```

Generates a form for creating a new customer account. To learn more about using this form, and its contents, refer to the [`customers/register` template](https://shopify.dev/themes/architecture/templates/customers-register#content).

```liquid
{% form 'create_customer' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'create_customer' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/account" id="create_customer" accept-charset="UTF-8" data-login-with-shop-sign-up="true"><input type="hidden" name="form_type" value="create_customer" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### currency

## Syntax

```oobleckTag
{% form 'currency' %}
  form_content
{% endform %}
```

***

Deprecated

The `currency` form is deprecated and has been replaced by the [`localization` form](https://shopify.dev/docs/api/liquid/tags/form#form-localization).

***

Generates a form for customers to select their preferred currency.

***

Tip

Use the [`currency_selector` filter](https://shopify.dev/docs/api/liquid/filters/currency_selector) to include a currency selector inside the form.

***

```liquid
{% form 'currency' %}
  {{ form | currency_selector }}
{% endform %}
```

##### Code

```
{% form 'currency' %}
  {{ form | currency_selector }}
{% endform %}
```

## Output

```html
<form method="post" action="/cart/update" id="currency_form" accept-charset="UTF-8" class="shopify-currency-form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="currency" /><input type="hidden" name="utf8" value="✓" /><input type="hidden" name="return_to" value="/services/liquid_rendering/resource" />
  <select name="currency"><option value="AED">AED د.إ</option><option value="AFN">AFN ؋</option><option value="AUD">AUD $</option><option value="CAD" selected="selected">CAD $</option><option value="CHF">CHF CHF</option><option value="CZK">CZK Kč</option><option value="DKK">DKK kr.</option><option value="EUR">EUR €</option><option value="GBP">GBP £</option><option value="HKD">HKD $</option><option value="ILS">ILS ₪</option><option value="JPY">JPY ¥</option><option value="KRW">KRW ₩</option><option value="MYR">MYR RM</option><option value="NZD">NZD $</option><option value="PLN">PLN zł</option><option value="SEK">SEK kr</option><option value="SGD">SGD $</option><option value="USD">USD $</option></select>
</form>
```

### customer

## Syntax

```oobleckTag
{% form 'customer' %}
  form_content
{% endform %}
```

Generates a form for creating a new customer without registering a new account. This form is useful for collecting customer information when you don't want customers to log in to your store, such as building a list of emails from a newsletter signup.

***

Tip

To generate a form that registers a customer account, use the [`create_customer` form](https://shopify.dev/docs/api/liquid/tags/form#form-create_customer).

***

To learn more about using this form, and its contents, refer to [Email consent](https://shopify.dev/themes/customer-engagement/email-consent#newsletter-sign-up-form).

```liquid
{% form 'customer' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'customer' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/contact#contact_form" id="contact_form" accept-charset="UTF-8" class="contact-form"><input type="hidden" name="form_type" value="customer" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### customer\_address

## Syntax

```oobleckTag
{% form 'customer_address', address_type %}
  form_content
{% endform %}
```

Generates a form for creating a new address on a customer account, or editing an existing one. The `customer_address` form requires a specific parameter, depending on whether a new address is being created or an existing one is being edited:

| Parameter value | Use-case |
| - | - |
| `customer.new_address` | When a new address is being created. |
| `address` | When an existing address is being edited. |

To learn more about using this form, and its contents, refer to the [`customers/addresses` template](https://shopify.dev/themes/architecture/templates/customers-addresses#content).

```liquid
{% form 'customer_address', customer.new_address %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'customer_address', customer.new_address %}
  <!-- form content -->
{% endform %}
```

##### Data

```
{
  "customer": {
    "new_address": {}
  }
}
```

## Output

```html
<form method="post" action="/account/addresses" id="address_form_new" accept-charset="UTF-8"><input type="hidden" name="form_type" value="customer_address" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### customer\_login

## Syntax

```oobleckTag
{% form 'customer_login' %}
  form_content
{% endform %}
```

Generates a form for logging into a customer account. To learn more about using this form, and its contents, refer to the [`customers/login` template](https://shopify.dev/themes/architecture/templates/customers-login#the-customer-login-form).

```liquid
{% form 'customer_login' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'customer_login' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/account/login" id="customer_login" accept-charset="UTF-8" data-login-with-shop-sign-in="true"><input type="hidden" name="form_type" value="customer_login" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### guest\_login

## Syntax

```oobleckTag
{% form 'guest_login' %}
  form_content
{% endform %}
```

Generates a form, for use in the [`customers/login` template](https://shopify.dev/themes/architecture/templates/customers-login), that directs customers back to their checkout session as a guest instead of logging in to an account. To learn more about using this form, and its contents, refer to [Offer guest checkout](https://shopify.dev/themes/architecture/templates/customers-login#offer-guest-checkout).

```liquid
{% form 'guest_login' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'guest_login' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/account/login" id="customer_login_guest" accept-charset="UTF-8"><input type="hidden" name="form_type" value="guest_login" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
<input type="hidden" name="guest" value="true" /></form>
```

### localization

## Syntax

```oobleckTag
{% form 'localization' %}
  form_content
{% endform %}
```

Generates a form for customers to select their preferred country so that they're shown the appropriate language and currency. The `localization` form can contain one of two selectors:

* A country selector
* A language selector

***

Note

The `localization` form replaces the deprecated [`currency` form](https://shopify.dev/docs/api/liquid/tags/form#form-currency).

***

To learn more about using this form, and its contents, refer to [Support multiple currencies and languages](https://shopify.dev/themes/internationalization/multiple-currencies-languages).

```liquid
{% form 'localization' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'localization' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/localization" id="localization_form" accept-charset="UTF-8" class="shopify-localization-form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="localization" /><input type="hidden" name="utf8" value="✓" /><input type="hidden" name="_method" value="put" /><input type="hidden" name="return_to" value="/services/liquid_rendering/resource" />
  <!-- form content -->
</form>
```

### new\_comment

## Syntax

```oobleckTag
{% form 'new_comment', article %}
  form_content
{% endform %}
```

Generates a form for creating a new comment on an article. The `new_comment` form requires an [`article` object](https://shopify.dev/docs/api/liquid/objects/article) as a parameter. To learn more about using this form, and its contents, refer to the [`article` template](https://shopify.dev/themes/architecture/templates/article#the-comment-form).

```liquid
{% form 'new_comment', article %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'new_comment', article %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/blogs/potion-notions/how-to-tell-if-you-have-run-out-of-invisibility-potion/comments#comment_form" id="comment_form" accept-charset="UTF-8" class="comment-form"><input type="hidden" name="form_type" value="new_comment" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### product

## Syntax

```oobleckTag
{% form 'product', product %}
  form_content
{% endform %}
```

Generates a form for adding a product variant to the cart. The `product` form requires a [`product` object](https://shopify.dev/docs/api/liquid/objects/product) as a parameter. To learn more about using this form, and its contents, refer to the [`product` template](https://shopify.dev/themes/architecture/templates/product#the-product-form).

```liquid
{% form 'product', product %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'product', product %}
  <!-- form content -->
{% endform %}
```

##### Data

```
{
  "product": {
    "id": 6786188247105
  }
}
```

## Output

```html
<form method="post" action="/cart/add" id="product_form_6786188247105" accept-charset="UTF-8" class="shopify-product-form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="product" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
<input type="hidden" name="product-id" value="6786188247105" /></form>
```

### recover\_customer\_password

## Syntax

```oobleckTag
{% form 'recover_customer_password' %}
  form_content
{% endform %}
```

Generates a form, for use in the [`customers/login` template](https://shopify.dev/themes/architecture/templates/customers-login), for a customer to recover a lost or forgotten password. To learn more about using this form, and its contents, refer to [Provide a "Forgot your password" option](https://shopify.dev/themes/architecture/templates/customers-login#provide-a-forgot-your-password-option).

```liquid
{% form 'recover_customer_password' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'recover_customer_password' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/account/recover" accept-charset="UTF-8"><input type="hidden" name="form_type" value="recover_customer_password" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### reset\_customer\_password

## Syntax

```oobleckTag
{% form 'reset_customer_password' %}
  form_content
{% endform %}
```

Generates a form for a customer to reset their password. To learn more about using this form, and its contents, refer to the [`customers/reset_password` template](https://shopify.dev/themes/architecture/templates/customers-reset-password#content).

```liquid
{% form 'reset_customer_password' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'reset_customer_password' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/account/reset" accept-charset="UTF-8"><input type="hidden" name="form_type" value="reset_customer_password" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

### storefront\_password

## Syntax

```oobleckTag
{% form 'storefront_password' %}
  form_content
{% endform %}
```

Generates a form for entering a password protected storefront. To learn more about using this form, and its contents, refer to the [`password` template](https://shopify.dev/themes/architecture/templates/password#the-password-form).

```liquid
{% form 'storefront_password' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'storefront_password' %}
  <!-- form content -->
{% endform %}
```

## Output

```html
<form method="post" action="/password" id="login_form" accept-charset="UTF-8" class="storefront-password-form"><input type="hidden" name="form_type" value="storefront_password" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
</form>
```

# form tag parameters

### return\_to

## Syntax

```oobleckTag
{% form 'form_type', return_to: string %}
  content
{% endform %}
```

By default, each form type redirects customers to a specific page after the form submits. For example, the `product` form redirects to the cart page.

The `return_to` parameter allows you to specify a URL to redirect to. This can be done with the following values:

| Value | Description |
| - | - |
| `back` | Redirect back to the same page that the customer was on before submitting the form. |
| A relative path | A specific URL path. For example `/collections/all`. |
| A [`routes` attribute](https://shopify.dev/docs/api/liquid/objects/routes) | For example, `routes.root_url` |

```liquid
{% form 'customer_login', return_to: routes.root_url %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form 'customer_login', return_to: routes.root_url %}
  <!-- form content -->
{% endform %}
```

##### Data

```
{
  "routes": {
    "root_url": "/"
  }
}
```

## Output

```html
<form method="post" action="/account/login" id="customer_login" accept-charset="UTF-8" data-login-with-shop-sign-in="true"><input type="hidden" name="form_type" value="customer_login" /><input type="hidden" name="utf8" value="✓" /><input type="hidden" name="return_to" value="/" />
  <!-- form content -->
</form>
```

### HTML attributes

## Syntax

```oobleckTag
{% form 'form_type', attribute: string %}
  content
{% endform %}
```

You can specify [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attributes) by adding a parameter that matches the attribute name with `data-` prepended, and the desired value.

```liquid
{% form "product", product, id: 'custom-id', class: 'custom-class', data-example: '100' %}
  <!-- form content -->
{% endform %}
```

##### Code

```
{% form "product", product, id: 'custom-id', class: 'custom-class', data-example: '100' %}
  <!-- form content -->
{% endform %}
```

##### Data

```
{
  "product": {
    "id": 6786188247105
  }
}
```

## Output

```html
<form method="post" action="/cart/add" id="custom-id" accept-charset="UTF-8" class="custom-class" enctype="multipart/form-data" data-example="100"><input type="hidden" name="form_type" value="product" /><input type="hidden" name="utf8" value="✓" />
  <!-- form content -->
<input type="hidden" name="product-id" value="6786188247105" /></form>

---
title: "Liquid tags: style"
description: Generates an HTML `<style>` tag with an attribute of `data-shopify`.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/style
  md: https://shopify.dev/docs/api/liquid/tags/style.md
---

# style

Generates an HTML `<style>` tag with an attribute of `data-shopify`.

***

Note

If you reference [color settings](https://shopify.dev/themes/architecture/settings/input-settings#color) inside `style` tags, then the associated CSS rules will update as the setting is changed in the theme editor, without a page refresh.

***

## Syntax

```oobleckTag
{% style %}
  CSS_rules
{% endstyle %}
```

CSS\_rules

The desired CSS rules for the `<style>` tag.

```liquid
{% style %}
  .h1 {
    color: {{ settings.colors_accent_1 }};
  }
{% endstyle %}
```

##### Code

```
{% style %}
  .h1 {
    color: {{ settings.colors_accent_1 }};
  }
{% endstyle %}
```

##### Data

```
{
  "settings": {
    "colors_accent_1": "#121212"
  }
}
```

## Output

```html
<style data-shopify>
  .h1 {
    color: #121212;
  }
</style>
```
```
---
title: "Liquid tags: break"
description: Stops a [`for` loop](/docs/api/liquid/tags/for) from iterating.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/break
  md: https://shopify.dev/docs/api/liquid/tags/break.md
---

# break

Stops a [`for` loop](https://shopify.dev/docs/api/liquid/tags/for) from iterating.

## Syntax

```oobleckTag
{% break %}
```

```liquid
{% for i in (1..5) -%}
  {%- if i == 4 -%}
    {% break %}
  {%- else -%}
    {{ i }}
  {%- endif -%}
{%- endfor %}
```

##### Code

```
{% for i in (1..5) -%}
  {%- if i == 4 -%}
    {% break %}
  {%- else -%}
    {{ i }}
  {%- endif -%}
{%- endfor %}
```

## Output

```html
1
2
3
```

---
title: "Liquid tags: continue"
description: Causes a [`for` loop](/docs/api/liquid/tags/for) to skip to the next iteration.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/continue
  md: https://shopify.dev/docs/api/liquid/tags/continue.md
---

# continue

Causes a [`for` loop](https://shopify.dev/docs/api/liquid/tags/for) to skip to the next iteration.

## Syntax

```oobleckTag
{% continue %}
```

```liquid
{% for i in (1..5) -%}
  {%- if i == 4 -%}
    {% continue %}
  {%- else -%}
    {{ i }}
  {%- endif -%}
{%- endfor %}
```

##### Code

```
{% for i in (1..5) -%}
  {%- if i == 4 -%}
    {% continue %}
  {%- else -%}
    {{ i }}
  {%- endif -%}
{%- endfor %}
```

## Output

```html
1
2
3
5
```
---
title: "Liquid tags: cycle"
description: Loops through a group of strings and outputs them one at a time for each iteration of a [`for` loop](/docs/api/liquid/tags/for).
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/cycle
  md: https://shopify.dev/docs/api/liquid/tags/cycle.md
---

# cycle

Loops through a group of strings and outputs them one at a time for each iteration of a [`for` loop](https://shopify.dev/docs/api/liquid/tags/for).

The `cycle` tag must be used inside a `for` loop.

***

Tip

Use the `cycle` tag to output text in a predictable pattern. For example, to apply odd/even classes to rows in a table.

***

## Syntax

```oobleckTag
{% cycle string, string, ... %}
```

```liquid
{% for i in (1..4) -%}
  {% cycle 'one', 'two', 'three' %}
{%- endfor %}
```

##### Code

```
{% for i in (1..4) -%}
  {% cycle 'one', 'two', 'three' %}
{%- endfor %}
```

## Output

```html
one
two
three
one
```

### Create unique cycle groups

## Syntax

```oobleckTag
{% cycle string: string, string, ... %}
```

If you include multiple `cycle` tags with the same parameters, in the same template, then each set of tags is treated as the same group. This means that it's possible for a `cycle` tag to output any of the provided strings, instead of always starting at the first string. To account for this, you can specify a group name for each `cycle` tag.

```liquid
<!-- Iteration 1 -->
{% for i in (1..4) -%}
  {% cycle 'one', 'two', 'three' %}
{%- endfor %}


<!-- Iteration 2 -->
{% for i in (1..4) -%}
  {% cycle 'one', 'two', 'three' %}
{%- endfor %}


<!-- Iteration 3 -->
{% for i in (1..4) -%}
  {% cycle 'group_1': 'one', 'two', 'three' %}
{%- endfor %}


<!-- Iteration 4 -->
{% for i in (1..4) -%}
  {% cycle 'group_2': 'one', 'two', 'three' %}
{%- endfor %}
```

##### Code

```
<!-- Iteration 1 -->
{% for i in (1..4) -%}
  {% cycle 'one', 'two', 'three' %}
{%- endfor %}

<!-- Iteration 2 -->
{% for i in (1..4) -%}
  {% cycle 'one', 'two', 'three' %}
{%- endfor %}

<!-- Iteration 3 -->
{% for i in (1..4) -%}
  {% cycle 'group_1': 'one', 'two', 'three' %}
{%- endfor %}

<!-- Iteration 4 -->
{% for i in (1..4) -%}
  {% cycle 'group_2': 'one', 'two', 'three' %}
{%- endfor %}
```

## Output

```html
<!-- Iteration 1 -->
one
two
three
one




<!-- Iteration 2 -->
two
three
one
two




<!-- Iteration 3 -->
one
two
three
one




<!-- Iteration 4 -->
one
two
three
one
```

---
title: "Liquid tags: else"
description: Allows you to specify a default expression to execute when a [`for` loop](/docs/api/liquid/tags/for) has zero length.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/iteration-else
  md: https://shopify.dev/docs/api/liquid/tags/iteration-else.md
---

# else

Allows you to specify a default expression to execute when a [`for` loop](https://shopify.dev/docs/api/liquid/tags/for) has zero length.

## Syntax

```oobleckTag
{% for variable in array %}
  first_expression
{% else %}
  second_expression
{% endfor %}
```

variable

The current item in the array.

array

The array to iterate over.

first\_expression

The expression to render for each iteration.

second\_expression

The expression to render if the loop has zero length.

```liquid
{% for product in collection.products %}
  {{ product.title }}<br>
{% else %}
  There are no products in this collection.
{% endfor %}
```

##### Code

```
{% for product in collection.products %}
  {{ product.title }}<br>
{% else %}
  There are no products in this collection.
{% endfor %}
```

##### Data

```
{
  "collection": {
    "products": []
  }
}
```

## Output

```html
There are no products in this collection.
```
---
title: "Liquid tags: for"
description: Renders an expression for every item in an array.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/for
  md: https://shopify.dev/docs/api/liquid/tags/for.md
---

# for

Renders an expression for every item in an array.

You can do a maximum of 50 iterations with a `for` loop. If you need to iterate over more than 50 items, then use the [`paginate` tag](https://shopify.dev/docs/api/liquid/tags/paginate) to split the items over multiple pages.

***

Tip

Every `for` loop has an associated [`forloop` object](https://shopify.dev/docs/api/liquid/objects/forloop) with information about the loop.

***

## Syntax

```oobleckTag
{% for variable in array %}
  expression
{% endfor %}
```

variable

The current item in the array.

array

The array to iterate over.

expression

The expression to render for each iteration.

```liquid
{% for product in collection.products -%}
  {{ product.title }}
{%- endfor %}
```

##### Code

```
{% for product in collection.products -%}
  {{ product.title }}
{%- endfor %}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
Draught of Immortality
Glacier ice
Health potion
Invisibility potion
```

# for tag parameters

### limit

## Syntax

```oobleckTag
{% for variable in array limit: number %}
  expression
{% endfor %}
```

You can limit the number of iterations using the `limit` parameter.

***

Tip

Limit the amount of data fetched for arrays that can be paginated with the `paginate` tag instead of using the `limit` parameter. Learn more about [limiting data fetching](https://shopify.dev/docs/api/liquid/tags/paginate#paginate-limit-data-fetching) for improved server-side performance.

***

```liquid
{% for product in collection.products limit: 2 -%}
  {{ product.title }}
{%- endfor %}
```

##### Code

```
{% for product in collection.products limit: 2 -%}
  {{ product.title }}
{%- endfor %}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
Draught of Immortality
Glacier ice
```

### offset

## Syntax

```oobleckTag
{% for variable in array offset: number %}
  expression
{% endfor %}
```

You can specify a 1-based index to start iterating at using the `offset` parameter.

```liquid
{% for product in collection.products offset: 2 -%}
  {{ product.title }}
{%- endfor %}
```

##### Code

```
{% for product in collection.products offset: 2 -%}
  {{ product.title }}
{%- endfor %}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
Health potion
Invisibility potion
```

### range

## Syntax

```oobleckTag
{% for variable in (number..number) %}
  expression
{% endfor %}
```

Instead of iterating over specific items in an array, you can specify a numeric range to iterate over.

***

Note

You can define the range using both literal and variable values.

***

```liquid
{% for i in (1..3) -%}
  {{ i }}
{%- endfor %}


{%- assign lower_limit = 2 -%}
{%- assign upper_limit = 4 -%}


{% for i in (lower_limit..upper_limit) -%}
  {{ i }}
{%- endfor %}
```

##### Code

```
{% for i in (1..3) -%}
  {{ i }}
{%- endfor %}

{%- assign lower_limit = 2 -%}
{%- assign upper_limit = 4 -%}

{% for i in (lower_limit..upper_limit) -%}
  {{ i }}
{%- endfor %}
```

## Output

```html
1
2
3


2
3
4
```

### reversed

## Syntax

```oobleckTag
{% for variable in array reversed %}
  expression
{% endfor %}
```

You can iterate in reverse order using the `reversed` parameter.

```liquid
{% for product in collection.products reversed -%}
  {{ product.title }}
{%- endfor %}
```

##### Code

```
{% for product in collection.products reversed -%}
  {{ product.title }}
{%- endfor %}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
Invisibility potion
Health potion
Glacier ice
Draught of Immortality
```

# forloopobject

Information about a parent [`for` loop](https://shopify.dev/docs/api/liquid/tags/for).

## Properties

* * first

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the current iteration is the first. Returns `false` if not.

  * index

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 1-based index of the current iteration.

  * index0

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 0-based index of the current iteration.

  * last

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the current iteration is the last. Returns `false` if not.

  * length

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The total number of iterations in the loop.

  * parentloop

    [forloop](https://shopify.dev/docs/api/liquid/objects/forloop)

  * The parent `forloop` object.

    If the current `for` loop isn't nested inside another `for` loop, then `nil` is returned.

    ExampleUse the `parentloop` property

    ```liquid
    {% for i in (1..3) -%}
      {% for j in (1..3) -%}
        {{ forloop.parentloop.index }} - {{ forloop.index }}
      {%- endfor %}
    {%- endfor %}
    ```

    ##### Code

    ```
    {% for i in (1..3) -%}
      {% for j in (1..3) -%}
        {{ forloop.parentloop.index }} - {{ forloop.index }}
      {%- endfor %}
    {%- endfor %}
    ```

    ## Output

    ```html
    1 - 1
    1 - 2
    1 - 3


    2 - 1
    2 - 2
    2 - 3


    3 - 1
    3 - 2
    3 - 3
    ```

  * rindex

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 1-based index of the current iteration, in reverse order.

  * rindex0

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 0-based index of the current iteration, in reverse order.

```json
{
  "first": true,
  "index": 1,
  "index0": 0,
  "last": false,
  "length": 4,
  "rindex": 3
}
```

##### Example

```
{
  "first": true,
  "index": 1,
  "index0": 0,
  "last": false,
  "length": 4,
  "rindex": 3
}
```

### Use the `forloop` object

```liquid
{% for page in pages -%}
  {%- if forloop.length > 0 -%}
    {{ page.title }}{% unless forloop.last %}, {% endunless -%}
  {%- endif -%}
{% endfor %}
```

##### Code

```
{% for page in pages -%}
  {%- if forloop.length > 0 -%}
    {{ page.title }}{% unless forloop.last %}, {% endunless -%}
  {%- endif -%}
{% endfor %}
```

## Output

```html
About us, Contact, Potion dosages
```

---
title: "Liquid tags: paginate"
description: Splits an array's items across multiple pages.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/paginate
  md: https://shopify.dev/docs/api/liquid/tags/paginate.md
---

# paginate

Splits an array's items across multiple pages.

Because [`for` loops](https://shopify.dev/docs/api/liquid/tags/for) are limited to 50 iterations per page, you need to use the `paginate` tag to iterate over an array that has more than 50 items. The following arrays can be paginated:

* [`article.comments`](https://shopify.dev/docs/api/liquid/objects/article#article-comments)
* [`blog.articles`](https://shopify.dev/docs/api/liquid/objects/blog#blog-articles)
* [`collections`](https://shopify.dev/docs/api/liquid/objects/collections)
* [`collection.products`](https://shopify.dev/docs/api/liquid/objects/collection#collection-products)
* [`customer.addresses`](https://shopify.dev/docs/api/liquid/objects/customer#customer-addresses)
* [`customer.orders`](https://shopify.dev/docs/api/liquid/objects/customer#customer-orders)
* [`pages`](https://shopify.dev/docs/api/liquid/objects/pages)
* [`product.variants`](https://shopify.dev/docs/api/liquid/objects/product#variants)
* [`search.results`](https://shopify.dev/docs/api/liquid/objects/search#search-results)
* [`collection_list` settings](https://shopify.dev/themes/architecture/settings/input-settings#collection_list)
* [`product_list` settings](https://shopify.dev/themes/architecture/settings/input-settings#product_list)

Within the `paginate` tag, you have access to the [`paginate` object](https://shopify.dev/docs/api/liquid/objects/paginate). You can use this object, or the [`default_pagination` filter](https://shopify.dev/docs/api/liquid/filters/default_pagination), to build page navigation.

## Syntax

```oobleckTag
{% paginate array by page_size %}
  {% for item in array %}
    forloop_content
  {% endfor %}
{% endpaginate %}


The `paginate` tag allows the user to paginate to the 25,000th item in the array and no further. To reach items further in
the array the array should be filtered further before paginating. See
[Pagination Limits](/themes/best-practices/performance/platform#pagination-limits) for more information.
```

array

The array to be looped over.

page\_size

The number of array items to include per page, between 1 and 250.

item

An item in the array being looped.

forloop\_content

Content for each loop iteration.

```liquid
{% paginate collection.products by 5 %}
  {% for product in collection.products -%}
    {{ product.title }}
  {%- endfor %}


  {{- paginate | default_pagination }}
{% endpaginate %}
```

##### Code

```
{% paginate collection.products by 5 %}
  {% for product in collection.products -%}
    {{ product.title }}
  {%- endfor %}

  {{- paginate | default_pagination }}
{% endpaginate %}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Blue Mountain Flower"
      },
      {
        "title": "Charcoal"
      },
      {
        "title": "Crocodile tears"
      },
      {
        "title": "Dandelion milk"
      },
      {
        "title": "Draught of Immortality"
      }
    ],
    "products_count": 19
  }
}
```

## Output

```html
Blue Mountain Flower
Charcoal
Crocodile tears
Dandelion milk
Draught of Immortality


<span class="page current">1</span> <span class="page"><a href="/services/liquid_rendering/resource?page=2" title="">2</a></span> <span class="page"><a href="/services/liquid_rendering/resource?page=3" title="">3</a></span> <span class="page"><a href="/services/liquid_rendering/resource?page=4" title="">4</a></span> <span class="next"><a href="/services/liquid_rendering/resource?page=2" title="">Next &raquo;</a></span>
```

### Paginating setting arrays

To allow the pagination of `product_list` and `collection_list` settings to operate independently from other paginated lists on a page, these lists use a pagination query parameter with a unique key. The key is automatically assigned by the `paginate` tag, and you don't need to reference the key in your code. However, you can access the key using [`paginate.page_param`](https://shopify.dev/docs/api/liquid/objects/paginate#paginate-page_param).

***

Tip

To paginate two arrays independently without refreshing the entire page, you can use the [Section Rendering API](https://shopify.dev/docs/api/ajax/section-rendering).

***

### Limit data fetching

The [`limit` parameter](https://shopify.dev/docs/api/liquid/tags/for#for-limit) of the `for` tag controls the number of iterations, but not the amount of information fetched. Using the `paginate` tag with a matching `page_size` can reduce the data queried, leading to faster server response times.

For example, referencing `collection.products` will fetch up to 50 products by default, regardless of the forloop's `limit` parameter. Use `paginate` and set a `page_size` to limit the amount of data fetched, and opt not to display any pagination controls.

More data than requested in a specific section may be returned. Because of this, make sure to include both `paginate` and `limit` when using this technique.

```liquid
{% paginate collection.products by 4 %}
  {% for product in collection.products limit: 4 -%}
    {{ product.title }}
  {%- endfor %}
{% endpaginate -%}


<!-- Less performant method -->
{% for product in collection.products limit: 4 -%}
  {{ product.title }}
{%- endfor -%}
```

##### Code

```
{% paginate collection.products by 4 %}
  {% for product in collection.products limit: 4 -%}
    {{ product.title }}
  {%- endfor %}
{% endpaginate -%}

<!-- Less performant method -->
{% for product in collection.products limit: 4 -%}
  {{ product.title }}
{%- endfor -%}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Blue Mountain Flower"
      },
      {
        "title": "Charcoal"
      },
      {
        "title": "Crocodile tears"
      },
      {
        "title": "Dandelion milk"
      }
    ],
    "products_count": 19
  }
}
```

## Output

```html
Blue Mountain Flower
Charcoal
Crocodile tears
Dandelion milk


<!-- Less performant method -->
Blue Mountain Flower
Charcoal
Crocodile tears
Dandelion milk
```

# paginate tag parameters

### window\_size

## Syntax

```oobleckTag
{% paginate collection.products by 3, window_size: 1 %}
```

Set the window size of the pagination. The window size is the number of pages that should be visible in the pagination navigation.

```liquid
{% paginate collection.products by 3, window_size: 1 %}
  {% for product in collection.products -%}
    {{ product.title }}
  {%- endfor %}


  {{- paginate | default_pagination }}
{% endpaginate %}
```

##### Code

```
{% paginate collection.products by 3, window_size: 1 %}
  {% for product in collection.products -%}
    {{ product.title }}
  {%- endfor %}

  {{- paginate | default_pagination }}
{% endpaginate %}
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Blue Mountain Flower"
      },
      {
        "title": "Charcoal"
      },
      {
        "title": "Crocodile tears"
      }
    ],
    "products_count": 19
  }
}
```

## Output

```html
Blue Mountain Flower
Charcoal
Crocodile tears


<span class="page current">1</span> <span class="deco">&hellip;</span> <span class="page"><a href="/services/liquid_rendering/resource?page=7" title="">7</a></span> <span class="next"><a href="/services/liquid_rendering/resource?page=2" title="">Next &raquo;</a></span>
```

---
title: "Liquid tags: tablerow"
description: Generates HTML table rows for every item in an array.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/tablerow
  md: https://shopify.dev/docs/api/liquid/tags/tablerow.md
---

# tablerow

Generates HTML table rows for every item in an array.

The `tablerow` tag must be wrapped in HTML `<table>` and `</table>` tags.

***

Tip

Every `tablerow` loop has an associated [`tablerowloop` object](https://shopify.dev/docs/api/liquid/objects/tablerowloop) with information about the loop.

***

## Syntax

```oobleckTag
{% tablerow variable in array %}
  expression
{% endtablerow %}
```

variable

The current item in the array.

array

The array to iterate over.

expression

The expression to render.

```liquid
<table>
  {% tablerow product in collection.products %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Code

```
<table>
  {% tablerow product in collection.products %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
<table>
  <tr class="row1">
<td class="col1">
    Draught of Immortality
  </td><td class="col2">
    Glacier ice
  </td><td class="col3">
    Health potion
  </td><td class="col4">
    Invisibility potion
  </td></tr>


</table>
```

# tablerow tag parameters

### cols

## Syntax

```oobleckTag
{% tablerow variable in array cols: number %}
  expression
{% endtablerow %}
```

You can define how many columns the table should have using the `cols` parameter.

```liquid
<table>
  {% tablerow product in collection.products cols: 2 %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Code

```
<table>
  {% tablerow product in collection.products cols: 2 %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
<table>
  <tr class="row1">
<td class="col1">
    Draught of Immortality
  </td><td class="col2">
    Glacier ice
  </td></tr>
<tr class="row2"><td class="col1">
    Health potion
  </td><td class="col2">
    Invisibility potion
  </td></tr>


</table>
```

### limit

## Syntax

```oobleckTag
{% tablerow variable in array limit: number %}
  expression
{% endtablerow %}
```

You can limit the number of iterations using the `limit` parameter.

```liquid
<table>
  {% tablerow product in collection.products limit: 2 %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Code

```
<table>
  {% tablerow product in collection.products limit: 2 %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
<table>
  <tr class="row1">
<td class="col1">
    Draught of Immortality
  </td><td class="col2">
    Glacier ice
  </td></tr>


</table>
```

### offset

## Syntax

```oobleckTag
{% tablerow variable in array offset: number %}
  expression
{% endtablerow %}
```

You can specify a 1-based index to start iterating at using the `offset` parameter.

```liquid
<table>
  {% tablerow product in collection.products offset: 2 %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Code

```
<table>
  {% tablerow product in collection.products offset: 2 %}
    {{ product.title }}
  {% endtablerow %}
</table>
```

##### Data

```
{
  "collection": {
    "products": [
      {
        "title": "Draught of Immortality"
      },
      {
        "title": "Glacier ice"
      },
      {
        "title": "Health potion"
      },
      {
        "title": "Invisibility potion"
      }
    ]
  }
}
```

## Output

```html
<table>
  <tr class="row1">
<td class="col1">
    Health potion
  </td><td class="col2">
    Invisibility potion
  </td></tr>


</table>
```

### range

## Syntax

```oobleckTag
{% tablerow variable in (number..number) %}
  expression
{% endtablerow %}
```

Instead of iterating over specific items in an array, you can specify a numeric range to iterate over.

***

Note

You can define the range using both literal and variable values.

***

```liquid
<table>
  {% tablerow i in (1..3) %}
    {{ i }}
  {% endtablerow %}
</table>


{%- assign lower_limit = 2 -%}
{%- assign upper_limit = 4 -%}


<table>
  {% tablerow i in (lower_limit..upper_limit) %}
    {{ i }}
  {% endtablerow %}
</table>
```

##### Code

```
<table>
  {% tablerow i in (1..3) %}
    {{ i }}
  {% endtablerow %}
</table>

{%- assign lower_limit = 2 -%}
{%- assign upper_limit = 4 -%}

<table>
  {% tablerow i in (lower_limit..upper_limit) %}
    {{ i }}
  {% endtablerow %}
</table>
```

## Output

```html
<table>
  <tr class="row1">
<td class="col1">
    1
  </td><td class="col2">
    2
  </td><td class="col3">
    3
  </td></tr>


</table><table>
  <tr class="row1">
<td class="col1">
    2
  </td><td class="col2">
    3
  </td><td class="col3">
    4
  </td></tr>


</table>
```

# tablerowloopobject

Information about a parent [`tablerow` loop](https://shopify.dev/docs/api/liquid/tags/tablerow).

## Properties

* * col

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 1-based index of the current column.

  * col\_​first

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the current column is the first in the row. Returns `false` if not.

  * col\_​last

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the current column is the last in the row. Returns `false` if not.

  * col0

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 0-based index of the current column.

  * first

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the current iteration is the first. Returns `false` if not.

  * index

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 1-based index of the current iteration.

  * index0

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 0-based index of the current iteration.

  * last

    [boolean](https://shopify.dev/docs/api/liquid/basics#boolean)

  * Returns `true` if the current iteration is the last. Returns `false` if not.

  * length

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The total number of iterations in the loop.

  * rindex

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 1-based index of the current iteration, in reverse order.

  * rindex0

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 0-based index of the current iteration, in reverse order.

  * row

    [number](https://shopify.dev/docs/api/liquid/basics#number)

  * The 1-based index of current row.

```json
{
  "col": 1,
  "col0": 0,
  "col_first": true,
  "col_last": false,
  "first": true,
  "index": 1,
  "index0": 0,
  "last": false,
  "length": 5,
  "rindex": 5,
  "rindex0": 4,
  "row": 1
}
```

##### Example

```
{
  "col": 1,
  "col0": 0,
  "col_first": true,
  "col_last": false,
  "first": true,
  "index": 1,
  "index0": 0,
  "last": false,
  "length": 5,
  "rindex": 5,
  "rindex0": 4,
  "row": 1
}
```

---
title: "Liquid tags: comment"
description: Prevents an expression from being rendered or output.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/comment
  md: https://shopify.dev/docs/api/liquid/tags/comment.md
---

# comment

Prevents an expression from being rendered or output.

Any text inside `comment` tags won't be output, and any Liquid code will be parsed, but not executed.

## Syntax

```oobleckTag
{% comment %}
  content
{% endcomment %}
```

content

The content of the comment.

### Inline comments

## Syntax

```oobleckTag
{% # content %}
```

Inline comments prevent an expression inside of a tag `{% %}` from being rendered or output.

You can use inline comment tags to annotate your code, or to temporarily prevent logic in your code from executing.

You can create multi-line inline comments. However, each line in the tag must begin with a `#`, or a syntax error will occur.

```liquid
{% # this is a comment %}


{% # for i in (1..3) -%}
  {{ i }}
{% # endfor %}


{%
  ###############################
  # This is a comment
  # across multiple lines
  ###############################
%}
```

##### Code

```
{% # this is a comment %}

{% # for i in (1..3) -%}
  {{ i }}
{% # endfor %}

{%
  ###############################
  # This is a comment
  # across multiple lines
  ###############################
%}
```

## Output

```html
```

### Inline comments inside `liquid` tags

You can use inline comment tags inside [`liquid` tags](https://shopify.dev/docs/api/liquid/tags/liquid). The tag must be used for each line that you want to comment.

```liquid
{% liquid
  # this is a comment
  assign topic = 'Learning about comments!'
  echo topic
%}
```

##### Code

```
{% liquid
  # this is a comment
  assign topic = 'Learning about comments!'
  echo topic
%}
```

## Output

```html
Learning about comments!
```

---
title: "Liquid tags: doc"
description: Documents template elements with annotations.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/doc
  md: https://shopify.dev/docs/api/liquid/tags/doc.md
---

# doc

Documents template elements with annotations.

The `doc` tag allows developers to include documentation within Liquid templates. Any content inside `doc` tags is not rendered or outputted. Liquid code inside will be parsed but not executed. This facilitates tooling support for features like code completion, linting, and inline documentation.

For detailed documentation syntax and examples, see the [`LiquidDoc` reference](https://shopify.dev/docs/storefronts/themes/tools/liquid-doc).

## Syntax

```oobleckTag
{% doc %}
  Renders a message.


  @param {string} foo - A string value.
  @param {string} [bar] - An optional string value.


  @example
  {% render 'message', foo: 'Hello', bar: 'World' %}
{% enddoc %}
```
---
title: "Liquid tags: echo"
description: Outputs an expression.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/echo
  md: https://shopify.dev/docs/api/liquid/tags/echo.md
---

# echo

Outputs an expression.

Using the `echo` tag is the same as wrapping an expression in curly brackets (`{{` and `}}`). However, unlike the curly bracket method, you can use the `echo` tag inside [`liquid` tags](https://shopify.dev/docs/api/liquid/tags/liquid).

***

Tip

You can use [filters](https://shopify.dev/docs/api/liquid/filters) on expressions inside `echo` tags.

***

## Syntax

```oobleckTag
{% liquid
  echo expression
%}
```

expression

The expression to be output.

```liquid
{% echo product.title %}


{% liquid
  echo product.price | money
%}
```

##### Code

```
{% echo product.title %}

{% liquid
  echo product.price | money
%}
```

##### Data

```
{
  "product": {
    "price": "10.00",
    "title": "Health potion"
  }
}
```

## Output

```html
Health potion


$10.00
```

---
title: "Liquid tags: liquid"
description: Allows you to have a block of Liquid without delimeters on each tag.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/liquid
  md: https://shopify.dev/docs/api/liquid/tags/liquid.md
---

# liquid

Allows you to have a block of Liquid without delimeters on each tag.

Because the tags don't have delimeters, each tag needs to be on its own line.

***

Tip

Use the [`echo` tag](https://shopify.dev/docs/api/liquid/tags/echo) to output an expression inside `liquid` tags.

***

## Syntax

```oobleckTag
{% liquid
  expression
%}
```

expression

The expression to be rendered inside the `liquid` tag.

```liquid
{% liquid
  # Show a message that's customized to the product type


  assign product_type = product.type | downcase
  assign message = ''


  case product_type
    when 'health'
      assign message = 'This is a health potion!'
    when 'love'
      assign message = 'This is a love potion!'
    else
      assign message = 'This is a potion!'
  endcase


  echo message
%}
```

##### Code

```
{% liquid
  # Show a message that's customized to the product type

  assign product_type = product.type | downcase
  assign message = ''

  case product_type
    when 'health'
      assign message = 'This is a health potion!'
    when 'love'
      assign message = 'This is a love potion!'
    else
      assign message = 'This is a potion!'
  endcase

  echo message
%}
```

##### Data

```
{
  "product": {
    "type": null
  }
}
```

## Output

```html
This is a health potion!
```
---
title: "Liquid tags: raw"
description: Outputs any Liquid code as text instead of rendering it.
api_name: liquid
source_url:
  html: https://shopify.dev/docs/api/liquid/tags/raw
  md: https://shopify.dev/docs/api/liquid/tags/raw.md
---

# raw

Outputs any Liquid code as text instead of rendering it.

## Syntax

```oobleckTag
{% raw %}
  expression
{% endraw %}
```

expression

The expression to be output without being rendered.

```liquid
{% raw %}
{{ 2 | plus: 2 }} equals 4.
{% endraw %}
```

##### Code

```
{% raw %}
{{ 2 | plus: 2 }} equals 4.
{% endraw %}
```

## Output

```html
{{ 2 | plus: 2 }} equals 4.
```


