from flask import Flask, request, redirect, jsonify
from flask_firebase import FirebaseAuth
# from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from scrapingbee import ScrapingBeeClient


client = ScrapingBeeClient(api_key='W9M3DRSN277PWESEA9FG87NA7DDHAAQ3NR6RTB444C11IXY3XDK142VVOSFA8IX04SZKW51CKJT4CNRY')



app = Flask(__name__)
app.debug = False # to disable local testing
app.config['FIREBASE_API_KEY'] = 'AIzaSyCnZvDgX1byC0RPvke6Ftog_yIAvqwSxFk'
app.config['FIREBASE_PROJECT_ID'] = 'scholarsheets-b98e7'
app.config['FIREBASE_AUTH_SIGN_IN_OPTIONS'] = 'email' # <-- coma separated list, see Providers above
app.config['SECRET_KEY'] = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXI2lyecmK7X22F6et1pVUQQ6N7hOBTjvP4llcnQjDkp2CSePKPOBAuJU4NQmIwJBlNJYIYVTY5xEEXHnOCB61y3MYI1dOuVn06wlASozbu97aglObPjkMHM3dbaeNEaIGEh5FR18e/lWAsryQ+Z/xECW6W+XCwAammmJSpmc/T90aQ4lcMThJ7lZj3Hg1mXOY+TFCo6FL5Shhw2lJcdvcJi1C8MrKMku4Dbjqgu/qsXenV7qpwA7oX0GLaAXW9LvyA3u2Ua7G/AHrjb0pEsyu+GoDBqGwDSFDlkm43NGQTevMP+inWu3sNXfynRwaF7ZHHXN1OUglsaBl4uCZ4m53AgMBAAECggEACWDCob5J0auD0eEs394BPQ2eXBMqNatHjdIjLlp2GUCHMnboQfu+BHYPmEG+OjSMoSL+rj1v2NeZmDYuvqiFU01w8k37FGDu4oIU/F7D17yUCuXsTyUwv/4njfZIX7n43jyQkUbo8ZDheE9e4PYERR514Nbj7k4g+4R31l4J6QUwm/B7hjAd/vnsh8ZSiQUOWe4LUAb1LH9rvvgM3Lv1VBuhYvhTUJ4NmwG7mw43g+i4lUXg2hZf5s0o6NnfwJOZNMOELipP9uIzVvnzBTKRKAlmrXskhFnPNAsEW+INhUnzSLLXOxC/JxLYN3Ab5vhqww9ypy56QnmpBRr/E2AduQKBgQDU1YJAa0stXGXqZSmprGciIAT9zeitQz2BLtXn0H4xK3hwjN1wyzdaoEETXXAv2NDyg30x7u0eI3sYgQjbFjPf6lO4fuTwuLCitOm7fXY0skIqTXTAR8eKQGQZCmUY+pUN5x7jWce8XP50WPqUA+ufykF932snBj1ouAG4HeT+KQKBgQC1yp6hobG/kRdDQGZMg/9FavQPUPSrOyM3HgpBLdwWNdvx/rXhGP0BVMeqkbYkMHUfQBc2m/ZqWj6MUT1KpFbcEfcnvdy6dIU2SFgFoI7Q7AaQXCfmCOiKlqaIwnX+8ftvdyQ8XJc9iCoPEkO73Fxj09Dt1XFfCl6f8d5AOdBbnwKBgAxMZiFo0chGPZFk1Rp73t3G8eLkohxY9VXgqfWiQ5h9xZDjYuxgocs31WrUDGaHZdONq49WGheSv0s0MZnPV6IJvVq84mfSlEpin9r4rfrvjgk5vpRZ0Xr4q5AS3LKr0C8ketFyX6tPyFhax+gDrfrmyhAG9/8iSiwh7d+Awrm5AoGADKVmuZm08r2WH7CILUR1ao/RIIuiKZM4lOn7DqOxDr56aXAtmNYTK5eJOD1grU3Np/neY4cf8jAK79nq6JlcDX0Wc2ZKx5G5fpgzv1h29uOkZUBz6hWuj42BUjws1ypgMlXYaHaMctRZEKlVmujuaGdgvlq9wz3GbVv2+QLMksMCgYEAoM2fjk4bCS5fapqGEU6QBCsNasNxzLKm7GnXvvpxPP7SXbxXWjYzg3lPxPORNo1O0pgmbmW4uBO9njsGKMrIF3/WA1kSCdFpTswA5FwBdvdyDEf7IN0KbXfjc2bOK9AHjhoCYWx78uimz7c87GI1bFjPEn5TImiRYpW1bz6sXiY='
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/firebase_users.db'

# db = SQLAlchemy(app)
# auth = FirebaseAuth(app)
# login_manager = LoginManager(app)

# app.register_blueprint(auth.blueprint, url_prefix='/auth')

# class Account(UserMixin, db.Model):

#     __tablename__ = 'accounts'

#     account_id = db.Column(db.Integer)
#     firebase_user_id = db.Column(db.Text, unique=True, primary_key=True)
#     email = db.Column(db.Text, unique=True, nullable=False)
#     email_verified = db.Column(db.Boolean, default=False, nullable=False)
#     name = db.Column(db.Text)
#     photo_url = db.Column(db.Text)
    
#     def get_id(self):
#         return self.firebase_user_id

#     def __repr__(self):
#         return str(dict(firebase_user_id=self.firebase_user_id, email=self.email, name=self.name))

# db.create_all() # <-- don't use this in production! This creates the account table in your sqlite
# db.session.commit()

# @auth.production_loader
# def production_sign_in(token):
#     account = Account.query.filter_by(firebase_user_id=token['sub']).one_or_none()
#     if account is None:
#         account = Account(firebase_user_id=token['sub'])
#         db.session.add(account)
#     account.email = token['email']
#     account.email_verified = token['email_verified']
#     account.name = token.get('name')
#     account.photo_url = token.get('picture')
#     db.session.flush()
#     login_user(account)
#     db.session.commit()


# @auth.development_loader
# def development_sign_in(email):
#     login_user(Account.query.filter_by(email=email).one())

# @auth.unloader
# def sign_out():
#     logout_user()

# @login_manager.user_loader
# def load_user(account_id):
#     return Account.query.get(account_id)

# @login_manager.unauthorized_handler
# def authentication_required():
#     return redirect(auth.url_for('widget', mode='select', next=request.url))

@app.route("/scholarships", methods=['POST'])
def get_scholarship_data(url):
    response = client.get(url)
    return jsonify(response)
