from flask import Flask, jsonify, request
from marshmallow import Schema, fields
from marshmallow import validate, ValidationError

class DiviceSchema(Schema):
    user = fields.Int(required=True, validate=validate.Range(min=1))
    cliente = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    telefono = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    direccion = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    F_ingreso = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    equipo = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    modelo = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    serial = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    marca = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    Fcompra = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    estadoP = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    accesorios = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    falla = fields.Str(required=True, validate=validate.Length(min=1, max=60))
    diagnostico = fields.Str(required=True, validate=validate.Length(min=1, max=60))

class AroundSchema(Schema):
    user = fields.Int(required=True, validate=validate.Range(min=1))

class MeetASchema(Schema):
    user = fields.Int(required=True, validate=validate.Range(min=1))
    code = fields.Str(required=True, validate=validate.Length(max=5))

