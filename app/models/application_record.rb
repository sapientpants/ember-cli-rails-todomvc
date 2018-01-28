class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  before_create :initialize_id

  private

  def initialize_id
    self.id = SecureRandom.uuid
  end
end
