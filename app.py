from flask import Flask, abort, jsonify, request
import os
import shutil
from werkzeug.utils import secure_filename
import nbformat
from nbconvert.preprocessors import ExecutePreprocessor
from nbconvert import HTMLExporter

app = Flask(__name__)

@app.route('/api/v1/reports', methods=['GET'])
def list_reports():
    res = {}

    reports_dir = os.getcwd() + '/static/reports'
    res['reports'] = [r for r in os.listdir(reports_dir) if not r.startswith(".")]

    return jsonify(res)

@app.route('/api/v1/reports/<name>', methods=['GET'])
def display_report(name):
    name = secure_filename(name)

    # Search for the report
    report_dir = get_report_dir(name)
    if not os.path.isdir(report_dir):
        abort(404)

    # Get notebook name
    report_nb = next(n for n in os.listdir(report_dir) if n.endswith(".ipynb"))

    # Execute the notebook
    # TODO / NOTE: the notebooks may require some libraries to be installed
    # https://nbconvert.readthedocs.io/en/latest/execute_api.html
    # https://nbconvert.readthedocs.io/en/latest/nbconvert_library.html
    with open(report_dir + '/' + report_nb) as f:
        nb = nbformat.read(f, as_version=4)
    ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
    ep.preprocess(nb, {'metadata': {'path': report_dir}})

    html_exporter = HTMLExporter()
    # html_exporter.template_file = 'basic'

    # Export the notebook into HTML
    (body, resources) = html_exporter.from_notebook_node(nb)

    return body


@app.route('/api/v1/reports/<name>', methods=['DELETE'])
def delete_report(name):
    report_name = secure_filename(name)
    report_dir = get_report_dir(report_name)
    shutil.rmtree(report_dir)
    return ('', 204)


@app.route('/api/v1/reports', methods=['POST'])
def upload_report():
    report_name = secure_filename(request.form.get("name"))
    report_dir = get_report_dir(report_name)
    os.mkdir(report_dir)
    for f in request.files.getlist('file'):
        f.save(os.path.join(report_dir, f.filename))
    return ('', 204)


def get_report_dir(report_name):
    return os.path.join(os.getcwd(), 'static/reports', report_name)

if __name__ == '__main__':
    app.run()
