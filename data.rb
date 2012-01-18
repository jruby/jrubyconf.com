SPEAKERS  = {}
TUESDAY   = []
WEDNESDAY = []

SPEAKERS[:adam_mccrea] = {
  :name    => 'Adam McCrea',
  :title   => 'Logician at EdgeCase',
  :avatar  => 'adam_mccreajax.png',
  :bio     => "<p>Jim Weirich first learned about computers when his college adviser suggested he take a computer science course: \"It will be useful, and you might enjoy it.\" With those prophetic words, Jim has been developing now for over 25 years, working with everything from crunching rocket launch data on supercomputers to wiring up servos and LEDs on micro-controllers.  Currently he loves working in Ruby and Rails as the Chief Scientist at EdgeCase, but you can also find him strumming on his ukulele as time permits.</p>",
  :twitter => 'adamlogic'
}

SPEAKERS[:leon_gersing] = {
  :name    => 'Leon Gersing',
  :title   => 'Baller at EdgeCase',
  :avatar  => 'adam_mccreajax.png',
  :bio     => "<p>Coming soon</p>"
}

SPEAKERS[:jerry_nummi] = {
  :name    => 'Jerry Nummi',
  :title   => 'Other Duties as Assigned at EdgeCase',
  :avatar  => 'adam_mccreajax.png',
  :bio     => "<p>Coming soon</p>"
}

12.times do
  TUESDAY << {
    :time        => '08:00a - 08:45a',
    :title       => 'Why I love TorqueBox (Why You Will Too)',
    :description => 'Lorem ipsum',
    :speaker_id  => 'adam_mccrea',
    :talk        => true
  }
end

12.times do
  WEDNESDAY << {
    :time        => '08:00a - 08:45a',
    :title       => 'Why I love TorqueBox (Why You Will Too)',
    :description => 'Lorem ipsum',
    :speaker_id  => 'adam_mccrea',
    :talk        => true
  }
end