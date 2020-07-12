from flask import Flask, abort, jsonify
import os
from werkzeug.utils import secure_filename
import nbformat
from nbconvert.preprocessors import ExecutePreprocessor
from nbconvert import HTMLExporter

app = Flask(__name__)

@app.route('/reports')
def list_reports():
    res = {}

    reports_dir = os.getcwd() + '/static/reports'
    res['reports'] = [r for r in os.listdir(reports_dir) if not r.startswith(".")]

    return jsonify(res)

@app.route('/reports/<name>')
def display_report(name):
    name = secure_filename(name)

    # Search for the report
    report_dir = os.getcwd() + '/static/reports/' + name
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

    # 3. Process the notebook we loaded earlier
    (body, resources) = html_exporter.from_notebook_node(nb)

    return body


if __name__ == '__main__':
    app.run()
