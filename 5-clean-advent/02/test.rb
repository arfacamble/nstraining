require_relative 'intcode'

puts "_______________________________________________________"
puts "                       TESTING                         "
puts "_______________________________________________________"
puts "\ninputs of 64 and 17 should give the result 19690720"
alarm = ProgramAlarm.new("data.txt", 64, 17)
alarm.run
puts ((res = alarm.state.first) == 19690720) ? "SUCCESS" : "FAIL (result is #{res})"

puts "_______________________________________________________"
puts "\ninputs of 12 and 2 should give the result 3895705"
alarm = ProgramAlarm.new("data.txt", 12, 2)
alarm.run
puts ((res = alarm.state.first) == 3895705) ? "SUCCESS" : "FAIL (result is #{res})"

puts "_______________________________________________________"
puts "\nnoun and verb finder looking for 19690720 should give a result of 64 and 17"
finder = NounAndVerbFinder.new
finder.run
puts (finder.noun == 64 && finder.verb == 17) ? "SUCCESS" : "FAIL"