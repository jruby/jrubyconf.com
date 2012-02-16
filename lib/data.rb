SPEAKERS  = {}

SPEAKERS[:jrubyconf] = {
  :name    => 'Coming Soon',
  :title   => '',
  :avatar  => 'default.png',
  :bio     => "<p>Full speaker list and schedule coming soon. Schedule is subject to change.</p>",
  :twitter => 'jrubyconf'
}

1.upto(11) do |i|
SPEAKERS["jrubyconf#{i}".to_sym] = {
  :name    => 'Coming Soon',
  :title   => '',
  :avatar  => 'default.png',
  :bio     => "<p>Full speaker list and schedule coming soon. Schedule is subject to change.</p>",
  :twitter => 'jrubyconf'
}
end

CONFIRMED_SPEAKERS = {
  :carinmeier => {
    :name => "Carin Meier",
    :avatar => "carin_meier.jpg",
    :bio => "Carin is a software developer at EdgeCase. She started off as a professional ballet dancer, studied Physics in college, and has been developing software for both the enterprise and entrepreneur for the past 15 years. She comes from a solid Java background, but has discovered a passion for the simplicity, power, and elegance of Clojure. She brings fun, enthusiasm, and hot tea to all her software projects and especially enjoys participating in the Open Source community.

She lives in Cincinnati, OH with her husband and two young children. When left to daydream, she thinks of the dynamics of flocks of birds, what the Giant Squids might really be doing down there in the deep, and maybe opening a first-rate cheese shop one day.",
    :twitter => "carinmeier"
  }
}

MONDAY    = []
TUESDAY   = []
WEDNESDAY = []

begin
  require 'schedule'
rescue LoadError
end
