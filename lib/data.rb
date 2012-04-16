# -*- coding: utf-8 -*-

SPEAKERS = {
  enebo: {
    name: "Thomas Enebo",
    avatar: "enebo.png",
    bio: "<p>Thomas Enebo is the co-lead of the JRuby project and an employee of Engine Yard. He has been a practitioner of Java since the heady days of the HotJava browser, and he has been happily using Ruby since 2001. Thomas has spoken at numerous Java and Ruby conferences, co-authored \"Using JRuby\", and was awarded the \"Rock Star\" award at JavaOne. When Thomas is not working he enjoys biking, anime, and drinking a decent IPA.</p>",
    twitter: "tom_enebo",
    talk: {
      description: "Surely something JRuby-ish."
    }
  },

  headius: {
    name: "Charles Nutter",
    bio: "<p>Charles Oliver Nutter has been programming most of his life, as a Java developer for the past decade and as a JRuby developer for over four years. He co-leads the JRuby project, an effort to bring the beauty of Ruby and the power of the JVM together. Charles believes in open source and open standards and hopes his efforts on JRuby and other languages will ensure the JVM remains the preferred open-source managed runtime for many years to come. Charles blogs at blog.headius.com and tweets as headius on Twitter.</p>",
    avatar: "cnutter.jpg",
    twitter: "headius"
  },

  j3: {
    name: "Jeff Casimir",
    bio: "<p>Jeff Casimir travels the world preaching the good word of Ruby for his company, <a href=\"http://www.jumpstartlab.com/\">Jumpstart Lab</a>. He interacts with hundreds of developers and dozens of teams each year, pushing his research into best practices and new ideas.</p>",
    avatar: "jeff_casimir.jpg",
    twitter: "j3",
    talk: {
      title: "Adventures on the Golden Path",
      description: "<p>Rails 1.0 was about proving we could build the same functionality as the other web frameworks, but doing it faster. Rails 2.0 was about pushing the vanguard forward, setting new trends for how the web should be built. Rails 3.0 paid down technical debt and laid the foundation for our future. Now what?</p>

<p>Rails has always guided developers down the \"golden path\" of best practices. Let's look at potholes needing filling, ways we can straighten the dangerous corners, and figure out where this road might be heading.</p>"
    }
  },

  yokolet: {
    name: "Yoko Harada",
    bio: "<p>Yoko is a dedicated programmer, blogger and, maybe, a nerd. She likes to code, read sources and learn new languages. Currently, Yoko is a committer of JRuby and Nokogiri project. When her API, RedBridge was merged to JRuby, she became a JRuby committer along with it in 2009. She became a Nokogiri committer in 2010 to help pure Java Nokogiri implementation to finish. Because JRuby and XML are Yoko’s favorite technologies, it was a good fit. Before that, Yoko was a server side Java evangelist in Japan, and wrote three books about Java Servlet. After she had more than three years of blank in 2005-8, she’s back to programming. Now, she enjoys days of happy coding.</p>",
    avatar: "yokolet.jpg",
    twitter: "yokolet",
    talk: {
      title: "Pure Java Nokogiri? It's Just Awesome.",
      description: "<p>A month before the JRubyConf 2011, pure Java Nokogiri made the first release. Since then, pure Java Nokogiri has caught people's attention. It is faster than FFI version, no struggle to install, no worry about a dependency, etc. Prior to the JRubyConf 2012, pure Java Nokogiri made the second release. The latest version had a Java integration feature as well as many bug fixings. Doesn't it sound awesome? Not just that. It is already a <a href=\"http://yehudakatz.com/2012/04/13/tokaido-my-hopes-and-dreams/\">Tokaido</a>-nized. It can be integrated with JVM languages. It is a well-used JRuby extension. It made performance improvement. Why don't you create something like this? I'll dig into how pure Java Nokogiri made that.</p>"
    }
  },

  venkat_s: {
    name: "Venkat Subramaniam",
    bio: "<p>Dr. Venkat Subramaniam is an award-winning author, founder of Agile Developer, Inc., and an adjunct faculty at the University of Houston.</p>

<p>He has trained and mentored thousands of software developers in the US, Canada, Europe, and Asia, and is a regularly-invited speaker at several international conferences. Venkat helps his clients effectively apply and succeed with agile practices on their software projects.</p>

<p>Venkat is the author of \".NET Gotchas,\" the coauthor of 2007 Jolt Productivity Award winning \"Practices of an Agile Developer,\" the author of \"Programming Groovy: Dynamic Productivity for the Java Developer\" and \"Programming Scala: Tackle Multi-Core Complexity on the Java Virtual Machine\" (Pragmatic Bookshelf). His latest book is \"Programming Concurrency on the JVM: Mastering synchronization, STM, and Actors\".</p>",
    avatar: "venkat.jpg",
    twitter: "venkat_s",
    talk: {
      title: "It could be heaven or it could be hell: Pleasure and peril of being a polyglot programmer",
      description: "<p>With so many languages on the Java platform, there are real benefits to learning and using them. However, these languages bring along some challenges as well. Attend this keynote to learn, from a world renowned polyglot programmer and author of books on multiple languages, the pleasures and perils of being a polyglot programmer.</p>"
    }
  },

  ntschutta: {
    name: "Nathaniel Schutta",
    bio: "<p>Nathaniel T. Schutta is a senior software engineer focussed on making usable applications. A proponent of polyglot programming, Nate has written two books on Ajax and speaks regularly at various worldwide conferences, No Fluff Just Stuff symposia, universities, and Java user groups. In addition to his day job, Nate is an adjunct professor at the University of Minnesota where he teaches students to embrace dynamic languages.</p>",
    avatar: "nate.jpg",
    twitter: "ntschutta",
    talk: {
    }
  },

  carinmeier: {
    name: "Carin Meier",
    avatar: "carin_meier.jpg",
    bio: "<p>Carin is a software developer at EdgeCase. She started off as a professional ballet dancer, studied Physics in college, and has been developing software for both the enterprise and entrepreneur for the past 15 years. She comes from a solid Java background, but has discovered a passion for the simplicity, power, and elegance of Ruby and Clojure. She brings fun, enthusiasm, and hot tea to all her software projects and especially enjoys participating in the Open Source community.</p>

<p>She lives in Cincinnati, OH with her husband and two young children. When left to daydream, she thinks of the dynamics of flocks of birds, what the Giant Squids might really be doing down there in the deep, and maybe opening a first-rate cheese shop one day.</p>",
    twitter: "carinmeier",
    talk: {
      title: "Double Rainbow testing with JRuby and rspec-given",
      description: "<p>Bring happiness to your Java project and to your developers by introducing JRuby and rspec-given.</p>
<p>JRuby testing is a easy, low stress, and fun way to expose your team to the blessings of a dynamic language with seamless Java interoperability. The rspec-given gem lets you write concise tests with a syntax that brings clarity and joy to the testing process. We will explore some practical examples of incorporating both JRuby and rspec-given into a sample project and experience the double rainbow.</p>"
    }
  },

  rthomas: {
    name: "Randall Thomas",
    bio: "<p>Randall Thomas is a classically trained musician that took one too many calculus classes along the way and got sucked into the sciences. Being both blessed and cursed with a strange form of technology ADD, he’s worked in various industries with numerous startups covering everything from robotics, to low level telecommunications & networking to applied computing for stock trading systems.</p><p>Randall is an internationally renowned speaker on practical data mining techniques and the business of startups.</p><p>When not glued to a computer Randall is likely lost in book or on a running trail wondering if he will get to the end of either.</p>",
    avatar: "rthomas.jpg",
    twitter: "daksis",
    talk: {
      description: "See the dynamic duo of Tam-Randall (as I affectionately now call them) dodge and dazzle with the fury of labs full of bolts of thunder."
    }
  },

  tsaleh: {
    name: "Tammer Saleh",
    bio: "<p>Tammer Saleh is a long time Rubyist, leader, and published author.</p><p>As the happily former VP Engineering at Engine Yard, Tammer ran the development team and the flagship Cloud product. He authored the acclaimed book, Rails AntiPatterns with Chad Pytel. He’s also the author of the Shoulda testing framework, and the fantastic Airbrake service.</p><p>Tammer has given classroom training in Ruby, Rails, JRuby, and Test Driven Development, and has spoken at various Ruby and Rails conferences around the world.</p><p>Previous lives include C/C++ AI programming, and UNIX administration for Citysearch.com and Caltech’s Earthquake Detection Net work.</p>",
    avatar: "tsaleh.jpg",
    twitter: "tsaleh"
  },

  ultrasaurus: {
    name: "Sarah Allen",
    bio: "<p>By day Sarah Allen is CEO of <a href=\"http://www.blazingcloud.net/\">Blazing Cloud</a>, a San Francisco consulting firm that creates innovative mobile products for hire, both web and native iOS/Android. By night, Sarah writes code for Mightyverse, which aspires to be a revenue generating product to help people communicate across languages and cultures. She's also working to change the face of software development with RailsBridge, and often teaches outreach workshops and kids. She created Pie, a open source language for kids to develop web adventure games.</p><p>Before her adventures in Ruby and mobile, Sarah has a history of developing leading-edge products, such as After Effects, Shockwave, Flash video, and OpenLaszlo. Sarah was named one of the top 25 women of the web by SF WoW (San Francisco Women of the Web) in 1998.</p><p>Sarah blogs at <a href=\"http://www.ultrasaurus.com/\">www.ultrasaurus.com</a>.</p>",
    avatar: "sarah_allen.jpg",
    twitter: "ultrasaurus",
    talk: {
      description: "Awaiting talk description."
    }
  },

  jremsikjr: {
    name: "Jim Remsik",
    title: "Big Tiger",
    bio: "<p>Jim Remsik is a world-renowned hugger, conference organizer, community instigator, and speaker. He's been around the world from London to the Bay. He's a principal at Bendyworks a software consultancy in Madison, WI. Jim answers to \"Tiger, Big Tiger, yo Tiger.\" But, what you should really know is he has been on Ripley's Believe it or Not, Raced Stock Cars Backwards and was ineffectively targeted by a serial killer in his youth. His talks draw on his wide range of life experiences and relate them back to how we can all become better people.</p>",
    avatar: "big_tiger.jpg",
    twitter: "jremsikjr",
    talk: {
      title: "Open (Source) Wounds",
      description: "<p>This talk will seek to raise recognition in our community to the fact that there are real people behind Open Source Software. We'll analyze the black box retrieved from the wreckage of well-known community disagreements. Suggest how to move the conversation forward as well as discuss tools and techniques for diffusing potentially explosive situations.</p>"
    }
  },

  nylons: {
    name: "Nancy Lyons",
    bio: "<p>Nancy Lyons works at the intersection of technology, community, and people. She empowers and motivates teams of technologists and creatives as the President and CEO of <a href=\"http://www.clockwork.net/\">Clockwork Active Media</a>.</p>
<p>Together with Meghan they’re the <a href=\"https://www.geekgirlsguide.com/\">Geek Girls Guide</a>, a duo dedicated to demystifying technology for audiences everywhere through extensive public speaking, writing, and online dialogue.</p>",
    avatar: "nancy_lyons.jpg",
    twitter: "nylons",
    talk: {
      title: "Dawn of the Devs",
      description: "<p>The interactive industry has a little PR problem: half the world sees us as reclusive loners sitting in dark rooms, and the other half sees us as app-happy adult kids riding through offices on scooters. However inaccurate this is, we have to change it. Future projects are riding on it, our industry is depending on it, and end users need it.</p>

<p>The web is about people. And the quality of our work on the web directly correlates to how well we work with people. We have a responsibility to make projects better and to create end products that are actually--in practice--the best solutions for our clients' problems. We have to learn to talk about what we do and how we do it, we have to teach clients how to think intelligently about the possibilities and realities of interactive products, and we have to ask our team members to do the same.</p>

<p>A lot of this starts with a good process. A good process serves every team member. Most importantly, it facilitates productive communication and collaboration, a critical requirement for good work. But to be good, a process needs team-wide participation. It only benefits everyone if everyone takes part, and projects go smoother only when the full team is involved. Everyone who works on interactive teams should care about and demand good process.</p>

<p>Drawing on our new book, Interactive Project Management: Pixels, People, and Process, we'll discuss the framework the Geek Girls Guide developed to establish a high standard, industry-wide way of approaching digital projects. We'll outline how to collaborate well no matter what role you play on the team, give a high-level overview of an interactive process that works with any type of interactive product, and articulate the kind of thinking that's required for successful, effective results.</p>"
    }
  },

  irishgirl: {
    name: "Meghan Wilker",
    bio: "<p>Meghan Wilker specializes in using strategy, technology, and process to bring people and products together. As VP, Managing Director at <a href=\"http://www.clockwork.net/\">Clockwork Active Media</a> she drives projects to produce engaging digital solutions.</p>
<p>Together with Nancy they’re the <a href=\"https://www.geekgirlsguide.com/\">Geek Girls Guide</a>, a duo dedicated to demystifying technology for audiences everywhere through extensive public speaking, writing, and online dialogue.</p>",
    avatar: "meghan_wilker.jpg",
    twitter: "irishgirl"
  },

  codefinger: {
    name: "Joe Kutner",
    bio: "<p>Joe is a professional software consultant at Arcturo, where he builds Ruby and Rails applications for clients of all sizes.
He also contributes to several JRuby projects including TorqueBox and Trinidad.</p>

<p>Joe is the author of the soon to be released <a href=\"http://pragprog.com/book/jkdepj\">\"Deploying JRuby Web Applications\" from the Pragmatic Bookshelf</a></p>",
    avatar: 'default.png',
    twitter: "codefinger",
    talk: {
      title: "Deploying JRuby Web Applications",
      description: "<p>This talk will help you bridge the gap between enjoying JRuby, and using it in the real world. JRuby can simplify your deployment architecture, while making your application more reliable, scalable, and easier to manage. You'll quickly see the benefits, but it will require a new technology stack.</p>

<p>There are three deployment strategies that can be used with any Rack-based JRuby application, and this talk will provide an overview of each of them.  We'll also discuss the technologies that make them possible, and when it's appropriate to use each strategy. You'll learn how the Warbler gem can be used to create an web application archive file. Then we'll discuss how the light-weight Trinidad web server can be used to create a flexible, modular deployment that still feels friendly and familiar. Finally, you'll learn how to power an application with TorqueBox, an all-in-one environment that includes built-in support for messaging, scheduling and daemons.</p>"
    }
  },

  xshay: {
    name: "Xavier Shay",
    bio: "<p>Xavier recently emigrated from Australia to San Francisco to work with the analytics team at Square. Prior, he worked on large Ruby projects at The Conversation and ClearGrain, and presented a world tour of a training course titled \"Your Database Is Your Friend\". He has been working with Ruby for half a decade, and has published and contributed to over 80 open source projects according to GitHub.</p>",
    avatar: 'xshay.png',
    twitter: 'xshay',
    talk: {
      title: "JRuby at Square",
      description: "<p>An experience report! Follow the journey of JRuby at Square, from humble beginnings to becoming the accepted standard for deploying Ruby applications. Along the way we'll discover the ups and downs of many packaging and deployment options, Java integration, mutual SSL authentication, real threads, cross-ruby compatibility, and a few surprises thrown in for good measure.</p>"
    }
  },

  bascule: {
    name: "Tony Arcieri",
    bio: "<p>LivingSocial Architecture Team member. Concurrent/Distributed Object Oriented Programming afficionado. JVM fan. Beer enthusiast. Karaoke fiend.</p>",
    avatar: 'default.png',
    twitter: 'bascule',
    talk: {
      title: "Concurrent Programming with Celluloid",
      description: "<p>Threads versus events: which should you choose? How about both? In this talk you'll learn about the Celluloid concurrency framework, which combines OOP and the Actor Model to give you concurrent Ruby objects. You'll also learn about how Celluloid lets you combine blocking I/O and asynchronous evented I/O, offering you all the benefits of EventMachine without the restrictions of a single event loop. The talk will also provide a brief introduction to DCell, a distributed extension to Celluloid.</p>"
    }
  },

  ronge: {
    name: "Andreas Ronge",
    bio: "<p>Andreas Ronge is the author of the Neo4j JRuby binding Neo4j.rb. When he does not work on this open source project or consult in projects using Neo4j.rb he practices the piano, currently the Brahms Piano Quartet in C minor. He is employed as a consultant at Jayway in Sweden since 2001.</p>",
    avatar: 'ronge.png',
    twitter: 'ronge',
    talk: {
      title: "Neo4j.rb and the Revival of a New Type of Object Database",
      description: "<p>The object database never became a huge success despite some real benefits like no impedance mismatch, no need for a complex or leaky ORM layer and great performance (e.g. no slow JOIN operations). A graph database has similar advantages but not the same disadvantages since it avoids coupling the database with a programming language. Instead, it uses the simple language of a graph (node, relationship and properties) for interaction with the database.</p>

<p>There are many problems which, really, only a graph database can solve properly. We'll show you the real world challenge, transposing from whiteboard to graph database using Neo4j running in Rails.</p>

<p>If your database cause you trouble because you need to persist or query data with many relationships between entities or if you're just curious why we believe graph databases are the next big thing then this talk is for you.</p>"
    }
  },

  david_wood: {
    name: "David Wood",
    title: "CTO, Jun Group",
    bio: "<p>David's technical management experience spans entertainment, media, and finance. Prior to joining Jun Group, David brought technology leadership and hands-on strategic and architectural direction to Gucci, TheStreet.com, and, most recently, Scripps Networks (Food Network, HGTV, DIY, Fine Living, and Great American Country).</p>

<p>At Jun Group, David and his team built the most advanced, flexible, and powerful social video network ever developed. As Chief Technology Officer, David is responsible for creating and maintaining the technology that delivers millions of opt-in video views across multiple devices, operating systems, and providers.</p>",
    avatar: 'david_wood.png',
    talk: {
      title: "JRuby for Performance",
      description: "<p>Jun Group is the leader in social video distribution for Fortune 500 brands. This means fielding thousands of requests per second from the largest Facebook games, websites and mobile applications. The industry demands real-time reporting in this data-rich milieu, and our tightly-integrated partners demand zero-downtime solutions. The company's explosive growth made getting there a breakneck race for the technology team, from MRI Rails prototype to Cloud-based infrastructure.</p>

<p>Our team attended JRubyConf in 2011, and afterwards we chose to use JRuby in our fight to reach web scale, not only to boost performance but to escape to the Java platform and language ecosystem (and leverage cheap Amazon Elastic Beanstalk JVMs)</p>.

<p>This is the \"performance\" talk I wish I had seen. We explain both the architectural and operational work involved in our move and how it enabled us to hit our time-to-scalability, reliability, and feature targets. Along the way we can discourse on the surprising opportunities that spring from multi-lingual, JVM-based development and the crucial benefits of regaining \"working\" multithreading, for instance as they relate to our sub-second clustered monitoring and self-tuning capacities, or our data storage and caching strategies.</p>

<p>In the end, it worked; we were able to scale an \"unscalable\" classic MRI Rails application quickly and cheaply, without a ground-up rewrite. The result was massive success for the business (see http://blog.jungroup.com/ for more).</p>"
    },
  }
}

# Copy data for two-speaker talks
SPEAKERS[:headius][:talk] = { title: SPEAKERS[:enebo][:talk][:title], description: SPEAKERS[:enebo][:talk][:description] }
SPEAKERS[:tsaleh][:talk] = { title: SPEAKERS[:rthomas][:talk][:title], description: SPEAKERS[:rthomas][:talk][:description] }
SPEAKERS[:irishgirl][:talk] = { title: SPEAKERS[:nylons][:talk][:title], description: SPEAKERS[:nylons][:talk][:description] }


MONDAY    = []
TUESDAY   = []
WEDNESDAY = []

begin
  require 'schedule'
rescue LoadError
end
