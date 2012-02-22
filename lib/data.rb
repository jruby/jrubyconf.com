# -*- coding: utf-8 -*-

SPEAKERS = {
  :enebo => {
    :name => "Thomas Enebo",
    :avatar => "enebo.png",
    :bio => "<p>Thomas Enebo is the co-lead of the JRuby project and an employee of Engine Yard. He has been a practitioner of Java since the heady days of the HotJava browser, and he has been happily using Ruby since 2001. Thomas has spoken at numerous Java and Ruby conferences, co-authored \"Using JRuby\", and was awarded the \"Rock Star\" award at JavaOne. When Thomas is not working he enjoys biking, anime, and drinking a decent IPA.</p>",
    :twitter => "tom_enebo"
  },

  :headius => {
    :name => "Charles Nutter",
    :bio => "<p>Charles Oliver Nutter has been programming most of his life, as a Java developer for the past decade and as a JRuby developer for over four years. He co-leads the JRuby project, an effort to bring the beauty of Ruby and the power of the JVM together. Charles believes in open source and open standards and hopes his efforts on JRuby and other languages will ensure the JVM remains the preferred open-source managed runtime for many years to come. Charles blogs at blog.headius.com and tweets as headius on Twitter.</p>",
    :avatar => "cnutter.jpg",
    :twitter => "headius"
  },

  :j3 => {
    :name => "Jeff Casimir",
    :bio => "<p>Jeff Casimir travels the world preaching the good word of Ruby for his company, <a href=\"http://www.jumpstartlab.com/\">Jumpstart Lab</a>. He interacts with hundreds of developers and dozens of teams each year, pushing his research into best practices and new ideas.</p>",
    :avatar => "jeff_casimir.jpg",
    :twitter => "j3"
  },

  :yokolet => {
    :name => "Yoko Harada",
    :bio => "<p>Yoko is a dedicated programmer, blogger and, maybe, a nerd. She likes to code, read sources and learn new languages. Currently, Yoko is a committer of JRuby and Nokogiri project. When her API, RedBridge was merged to JRuby, she became a JRuby committer along with it in 2009. She became a Nokogiri committer in 2010 to help pure Java Nokogiri implementation to finish. Because JRuby and XML are Yoko’s favorite technologies, it was a good fit. Before that, Yoko was a server side Java evangelist in Japan, and wrote three books about Java Servlet. After she had more than three years of blank in 2005-8, she’s back to programming. Now, she enjoys days of happy coding.</p>",
    :avatar => "yokolet.jpg",
    :twitter => "yokolet"
  }
}

TBA_SPEAKERS = {
  :carinmeier => {
    :name => "Carin Meier",
    :avatar => "carin_meier.jpg",
    :bio => "<p>Carin is a software developer at EdgeCase. She started off as a professional ballet dancer, studied Physics in college, and has been developing software for both the enterprise and entrepreneur for the past 15 years. She comes from a solid Java background, but has discovered a passion for the simplicity, power, and elegance of Clojure. She brings fun, enthusiasm, and hot tea to all her software projects and especially enjoys participating in the Open Source community.</p>

<p>She lives in Cincinnati, OH with her husband and two young children. When left to daydream, she thinks of the dynamics of flocks of birds, what the Giant Squids might really be doing down there in the deep, and maybe opening a first-rate cheese shop one day.</p>",
    :twitter => "carinmeier"
  },

  :rthomas => {
    :name => "Randall Thomas",
    :bio => "<p>Randall Thomas is a classically trained musician that took one too many calculus classes along the way and got sucked into the sciences. Being both blessed and cursed with a strange form of technology ADD, he’s worked in various industries with numerous startups covering everything from robotics, to low level telecommunications & networking to applied computing for stock trading systems.</p><p>Randall is an internationally renowned speaker on practical data mining techniques and the business of startups.</p><p>When not glued to a computer Randall is likely lost in book or on a running trail wondering if he will get to the end of either.</p>",
    :avatar => "rthomas.jpg",
    :twitter => "daksis"
  },

  :tsaleh => {
    :name => "Tammer Saleh",
    :bio => "<p>Tammer Saleh is a long time Rubyist, leader, and published author.</p><p>As VP Engineering at Engine Yard, Tammer ran the development team and the flagship Cloud product. He authored the acclaimed book, Rails AntiPatterns with Chad Pytel. He’s also the author of the Shoulda testing framework, and the fantastic Airbrake service.</p><p>Tammer has given classroom training in Ruby, Rails, JRuby, and Test Driven Development, and has spoken at various Ruby and Rails conferences around the world.</p><p>Previous lives include C/C++ AI programming, and UNIX administration for Citysearch.com and Caltech’s Earthquake Detection Net work.</p>",
    :avatar => "tsaleh.jpg",
    :twitter => "tsaleh"
  },

  :ultrasaurus => {
    :name => "Sarah Allen",
    :bio => "<p>By day Sarah Allen is CEO of <a href=\"http://www.blazingcloud.net/\">Blazing Cloud</a>, a San Francisco consulting firm that creates innovative mobile products for hire, both web and native iOS/Android. By night, Sarah writes code for Mightyverse, which aspires to be a revenue generating product to help people communicate across languages and cultures. She's also working to change the face of software development with RailsBridge, and often teaches outreach workshops and kids. She created Pie, a open source language for kids to develop web adventure games.</p><p>Before her adventures in Ruby and mobile, Sarah has a history of developing leading-edge products, such as After Effects, Shockwave, Flash video, and OpenLaszlo. Sarah was named one of the top 25 women of the web by SF WoW (San Francisco Women of the Web) in 1998.</p><p>Sarah blogs at <a href=\"http://www.ultrasaurus.com/\">www.ultrasaurus.com</a>.</p>",
    :avatar => "sarah_allen.jpg",
    :twitter => "ultrasaurus"
  },

  :jremsikjr => {
    :name => "Jim Remsik",
    :title => "Big Tiger",
    :bio => "<p>Jim Remsik is a world-renowned hugger, conference organizer, community instigator, and speaker. He's been around the world from London to the Bay. He's a principal at Bendyworks a software consultancy in Madison, WI. Jim answers to \"Tiger, Big Tiger, yo Tiger.\" But, what you should really know is he has been on Ripley's Believe it or Not, Raced Stock Cars Backwards and was ineffectively targeted by a serial killer in his youth. His talks draw on his wide range of life experiences and relate them back to how we can all become better people.</p>",
    :avatar => "big_tiger.jpg",
    :twitter => "jremsikjr"
  }
}

if development?
  SPEAKERS.merge!(TBA_SPEAKERS)
end

(0...(12-SPEAKERS.keys.length)).map {|x| x == 0 ? '' : x.to_s }.each do |i|
SPEAKERS["jrubyconf#{i}".to_sym] = {
  :name     => 'JRubyConf',
  :title    => 'Coming Soon',
  :avatar   => 'default.png',
  :bio      => "<p>Full speaker list and schedule coming soon. Schedule is subject to change.</p>",
  :twitter  => 'jrubyconf'
}
end

MONDAY    = []
TUESDAY   = []
WEDNESDAY = []

begin
  require 'schedule'
rescue LoadError
end
