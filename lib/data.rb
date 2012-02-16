SPEAKERS  = {}

CONFIRMED_SPEAKERS = {
  :carinmeier => {
    :name => "Carin Meier",
    :avatar => "carin_meier.jpg",
    :bio => "<p>Carin is a software developer at EdgeCase. She started off as a professional ballet dancer, studied Physics in college, and has been developing software for both the enterprise and entrepreneur for the past 15 years. She comes from a solid Java background, but has discovered a passion for the simplicity, power, and elegance of Clojure. She brings fun, enthusiasm, and hot tea to all her software projects and especially enjoys participating in the Open Source community.</p>

<p>She lives in Cincinnati, OH with her husband and two young children. When left to daydream, she thinks of the dynamics of flocks of birds, what the Giant Squids might really be doing down there in the deep, and maybe opening a first-rate cheese shop one day.</p>",
    :twitter => "carinmeier"
  },

  :enebo => {
    :name => "Thomas Enebo",
    :avatar => "enebo.png",
    :bio => "<p>Thomas Enebo is the co-lead of the JRuby project and an employee of Engine Yard. He has been a practitioner of Java since the heady days of the HotJava browser, and he has been happily using Ruby since 2001. Thomas has spoken at numerous Java and Ruby conferences, co-authored \"Using JRuby\", and was awarded the \"Rock Star\" award at JavaOne. When Thomas is not working he enjoys biking, anime, and drinking a decent IPA.</p>",
    :twitter => "tom_enebo"
  }
}

if development?
  SPEAKERS.merge!(CONFIRMED_SPEAKERS)
  SPEAKER_COUNT = CONFIRMED_SPEAKERS.keys.length
else
  SPEAKER_COUNT = 0
end

(0...(12-SPEAKER_COUNT)).map {|x| x == 0 ? '' : x.to_s }.each do |i|
SPEAKERS["jrubyconf#{i}".to_sym] = {
  :name    => 'Coming Soon',
  :title   => '',
  :avatar  => 'default.png',
  :bio     => "<p>Full speaker list and schedule coming soon. Schedule is subject to change.</p>",
  :twitter => 'jrubyconf'
}
end

MONDAY    = []
TUESDAY   = []
WEDNESDAY = []

begin
  require 'schedule'
rescue LoadError
end
