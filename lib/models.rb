require 'openssl'

class Proposal < ActiveRecord::Base
  before_save :check_twitter_at

  def key
    self['key'] || generate_key
  end

  private
  def check_twitter_at
    self['twitter'] = self['twitter'] && self['twitter'].sub(/^@/,'')
  end

  def generate_key
    OpenSSL::Random.random_bytes(32).unpack('h*')[0]
  end
end
