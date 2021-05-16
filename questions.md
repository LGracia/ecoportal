# Databases

Produce a data model in mongodb for the following:
1. An organization contains employees and can also have various teams and subteams
2. An employee can be a member of more than one team or organization
3. A page has default fields (title, creator, timestamps) and one or more sections
4. Each section can contain one or more fields (number, text or date)
5. A page/section/field may be permissioned against certain teams or directly against certain employees

Use whatever format you're comfortable with (diagram, code, text explanation).
Briefly outline the strengths/weaknesses/capabilities of your approach.

```
Organization
{
  _id: <ObjectId>,
  members: [
    {
      type: EMPLOYEE | TEAM | SUBTEAM,
      object_id: ID_OF_EMPLOYEE_OR_TEAM_OR_SUBTEAM
    }
  ]
}

Employee
{
  _id: <ObjectId>
}

Team
{
  _id: <ObjectId>,
  type: TEAM | SUBTEAM,
  ancestor: _ID_OF_FATHER_TEAM,
  employees: [ ID_OF_EMPLOYEE ]
}

Page
{
  _id: <ObjectId>
  title: TITLE_OF_PAGE,
  creator: ID_OF_EMPLOYEE,
  permissioned: [
    {
      type: EMPLOYEE | TEAM,
      object_id: ID_OF_EMPLOYEE_OR_TEAM
    }
  ]
  sections: [
    {
      name: NAME_OF_SECTION,
      permissioned: [
        {
          type: EMPLOYEE | TEAM,
          object_id: ID_OF_EMPLOYEE_OR_TEAM
        }
      ],
      fields: [
        {
          type: TYPE_OF_FIELD,
          name: NAME_OF_FIELD,
          permissioned: [
            {
              type: EMPLOYEE | TEAM,
              object_id: ID_OF_EMPLOYEE_OR_TEAM
            }
          ]
        }
      ]
    }
  ],
  created_at: DATE_TIME,
  updated_at: DATE_TIME
}
```
- Strengths:
  1) To update information in our models doesn't required extra efforts.
  2) To Avoid writing the same data in a big part of de models.
  3) To remove an `employee` does't represent a big deal.
  4) Easy way to handle permissions.
- Weaknesses:
  1) To get data from `page` model requires some joins.
- Capabilities:
  1) Adding new fields to `employee` or `team` is easy.
  2) It is simple to add new models and to create relationship between them.

# Elasticsearch

Create an Elasticsearch mapping for your pages structure.
It should be able to:
- Handle permissions (see 5. above)
- Aggregate field values based on their type

Can you give an example of a permission query (eg all pages in an organization for a certain team/employee)?
Can you give an example of an aggregation on date fields between two dates in 1 hour increments?

```
{
  "my-index-000001" : {
    "mappings" : {
      "properties" : {
        "title" : {
          "type" : "text"
        },
        "created_at" : {
          "type" : "date"
        },
        "updated_at" : {
          "type" : "date"
        },
        "page-id" : {
          "type" : "keyword",
          "index" : false
        },
        "permissioned" : {
          "type" : "nested"
        },
        "sections" : "nested" 
      }
    }
  }
}
```

```
{
  "query": {
    "bool": {
      "must": [
        { "match": { "permissioned.object_id": the_id }},
        { "match": { "permissioned.type":  EMPLOYEE }}
      ]
    }
  }
}
```

# OOP

When would you use inheritance and when composition?
Give an example of both.

- Composition: I would use composition when an object has a relationship with another object, composition is worry about what the class does, for example if we have the class `order` and this order has a `customer`.
- Inheritance: In this case I would use it when a class is the extension of another class, inheritance is worry about what the class is, for example if we have a class called `customer` and another class called `person`, the customer is a person, so customer inherits from person.

# DevOps

Not so much a question as a brief overview of what AWS services you've used in the past, how they fitted together, their strengths and weaknesses and which ones you liked/hated the most.
If you haven't used AWS before, have you used any other cloud based infrastructure?

I have worked with ElasticTranscoder, EC2, S3 and RDS I can say that in my opinion they don't have
weaknesses, they where created to give a solution to a problem and we can use them or not, although, when I started use them I felt the struggle understanding the documentation, but it was maybe 5 years before.
In teh other side, I think they are a powerful tool because allows us to keep independency in our infrastructure, we don't have to be worried about configuring a databese manually with RDS, or processing
videos and audio formats we share between our mobile platforms, or storing images, files in our server is just put them in S3 and work just with URLs, then I could say that I love all services I know.


# Ruby

Without using `uniq`, define a function in ruby that accepts a list and returns only the unique values in that list.

```
def remove_duplicates(list)
  new_list = []
  list.each { |v| new_list << v unless new_list.include? v }
  new_list
end
```

# OOP

In simple words, explain what polymorphism is.
With pseudo code, can you implement it for simple classes (eg a number, a string, an array, a hash class - use adding as an example)?
Can you also give me an implementation in javascript and the same for Ruby?

Polymorphism is the ability to execute methods in different ways for different objects.

```
method adding(arg1, arg2)
  return arg1 + arg2
end

begin
  a <- write_a_value
  b <- write_a_value

  print adding(a, b)
end
```

```
class Person
  def greeting
    puts 'people say `hi`'
  end
end

class German < Person
  def greeting
    puts 'germans say `hallo`'
  end
end

[Person.new, German.new].each { |v| v.greeting }

# In the array they are objects from different classes with a similar method called `greeting`,
# the result of execute that method is different.
```

```
1 + 1;
'Hello' + ' ' + 'I am Leonel';

# In this case the operator `+` works for diferents data types
```

# Code review/refactoring

Comment on the following piece of "library" code with respect to purpose and style. Identify issues and how you would fix them, or any suggested improvements.

```
# The porpose of this class is allows to users to implement a SortedQueue,
# the method `add` receives 2 params the first one is the element we want to store
# and the second one is the value we are going to take into account in order
# to give to the element a position in the stack.

require 'set'
# I would change the class name to SortedQueue or to another name more specific
class PQ
  def initialize
    @x = SortedSet.new
  end # add a space between method definitions
  class El # Use a name more clear, something like Element
    attr_reader :p, :x # Add a blank space below, change the name of attributes to somenthing more clear
    def initialize(p,x)
      @p = p
      @x = x
    end # add a space between method definitions
    def <=>(y)
      # What happen if we receive a string or another diferent type in `y.p` ?
      # It would be great handle a validation here `y.p` should be a number
      @p <=> y.p
    end
  end # add a space between method definitions
  def add(item, priority)
    @x.add(El.new(priority,item)) # I'm nitpicking, I prefer to keep the same order in params, if I receive (item, priority), I will send (item, priority)
  end # add a space between method definitions
  def deQ # I wold change the method name (ruby recomments using snake case), but I prefer call it `dequeue`
    return unless item = @x.first
    @x.delete(item)
    item.x
  end
end

# Tests
q = PQ.new
q.add(42, 21)
q.add("a", 15)
q.add(:dog, 37)
puts q.deQ # check this is "a"
q.add("a", 42)
puts q.deQ # check this is 42
puts q.deQ # check this is dog
puts q.deQ # check this is a
puts q.deQ # check this is nothing
```

# Front End Mini project

Using the endpoints available at [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/), display a list of posts along with the comments associated with each post.
Feel free to use the front end language and frameworks of your choice (JS, TypeScript, Angular, React, Vue, ...).

# GraphQL

What would need changing to your project to consume the data if it were in a GrapQL format?

In order to implement GraphQl instead of REST, what I would do is implement Apollo client for react:
- In the console, execute `npm install @apollo/client graphql` and press enter.
- Import `ApolloClient` in `index.js` file.
- Define an instance of `ApolloClient` in the `index.js` file.
- Create `ApolloProvider` in `index.js` file and set the prop client with the client defined in the previous step,
  wrap the `<App />` component to be able to implement the client in each file of my app.
- I would create a new file with the queries I will use to get the data in `const` variables.
- Where I'm calling the REST Api now, I would import the file with the queries I need as well as the `'@apollo/client'` requiring `useQuery` method from it.
- Replace REST Api calls with the execution of `useQuery` method with the query we want to execute as a parameter.

These are the steps we need to keep in mind to replace Rest requests with Graphql.

Note: `useQuery` method returns 3 values, the first one is a boolean value that says if the request is loading the data,
the second one lets us to know if there was an error, and the last one returns the data.