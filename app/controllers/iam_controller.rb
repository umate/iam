class IamController < ApplicationController
  layout false

  def menu
    @account_samples = account_samples
  end

  def log_in_as
    return if Rail.env == 'production'

    account = Iam::Configuration.account_class.constantize.find(params[:id])
    sign_in Iam::Configuration.account_class.downcase, account

    name = Iam::Configuration.account_attributes.map{ |key| account.public_send(key)}.join(' ')
    render json: { notice: I18n.t('iam.success', name: name) }
  end

  private
  def account_samples
    role_class = Iam::Configuration.role_class.constantize
    account_class = Iam::Configuration.account_class.constantize

    role_class.all.inject({}) do |account_groups, role|
      account_group = account_class.where(role_class.to_s.foreign_key => role.id).order(:id).limit(Iam::Configuration.accounts_for_each_role)
      account_groups.merge role => account_group
    end
  end
end
