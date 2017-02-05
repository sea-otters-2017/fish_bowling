class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def pluralize(count, noun, text = nil)
    if count != 0
      count == 1 ? "a #{noun}#{text}" : "#{count} #{noun.pluralize}#{text}"
    end
  end
  
end
