
class ProgramAlarm
  attr_reader :state

  def initialize(txt_file_path, noun, verb)
    @state
    parse_data(txt_file_path)
    arbitrary_value_change(noun, verb)
  end

  def run
    next_position = 0
    @complete = false
    until @complete || next_position >= @state.length
      make_next_computation(next_position)
      next_position += 4
    end
  end

  private

  def make_next_computation(next_position)
    instruction = @state[next_position]
    numbers = get_numbers(next_position)

    case instruction
    when 1 then result = numbers.inject(:+)
    when 2 then result = numbers.inject(:*)
    when 99
      @complete = true
      return
    else
      @complete = true
      raise_error(next_position, instruction)
      return
    end

    insert_index = @state[next_position + 3]
    @state[insert_index] = result
  end

  def get_numbers(instruction_position)
    pos_of_num_one = @state[instruction_position + 1]
    num_one = @state[pos_of_num_one]
    pos_of_num_two = @state[instruction_position + 2]
    num_two = @state[pos_of_num_two]
    [num_one, num_two]
  end

  def raise_error(position, instruction)
    puts "AAAAAAAAH mistake mistake - found number #{instruction} in position #{position}!"
  end

  def parse_data(txt_file_path)
    @state = File.open(txt_file_path)
                 .read
                 .split(",")
                 .map(&:to_i)
  end

  def arbitrary_value_change(noun, verb)
    @state[1] = noun
    @state[2] = verb
  end
end

class NounAndVerbFinder
  def initialize
    @noun = 0
    @verb = 0
  end
  
  def run
    @complete = false
    until @complete
      try_two_numbers
      change_noun_and_verb
    end
  end

  private

  def try_two_numbers
    alarm = ProgramAlarm.new("data.txt", @noun, @verb)
    alarm.run
    result = alarm.state.first
    if result == 19690720
      @complete = true
      puts "\nA christmas miracle, the noun #{@noun} and verb #{@verb} arbitrarily inserted "\
           "in positions 1 and 2 results in 19690720 being in the first position after the program has run."
      puts "\n This means your final answer is #{@noun * 100 + @verb}\n____________________________________________________"
    else
      puts "Noun: #{@noun.to_s.rjust(2)} - Verb: #{@verb.to_s.rjust(2)} - Result: #{result}"
    end
  end

  def change_noun_and_verb
    if @noun < 99
      @noun += 1
    else
      @noun = 0
      @verb += 1
    end
  end
end

# alarm = ProgramAlarm.new("data.txt", 64, 17)
# alarm.run
# # p alarm.state
# puts "Final number in position 0 : #{alarm.state.first}"

start_time = Time.now
finder = NounAndVerbFinder.new
finder.run
puts "This inefficient program took #{Time.now - start_time} seconds to run."