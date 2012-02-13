require 'openssl'

class Proposal < ActiveRecord::Base
  def key
    self['key'] || generate_key
  end

  private
  def generate_key
    OpenSSL::Random.random_bytes(32).unpack('h*')[0]
  end
end
