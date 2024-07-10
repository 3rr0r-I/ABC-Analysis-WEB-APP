from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    unit_cost = data['unit_cost']
    annual_demand = data['annual_demand']
    
    # Table 2 Calculations
    total_values = [uc * ad for uc, ad in zip(unit_cost, annual_demand)]
    sum_total_value = sum(total_values)
    total_value_percentage = [(val / sum_total_value) * 100 for val in total_values]
    sequence = sorted(range(len(total_value_percentage)), key=lambda k: total_value_percentage[k], reverse=True)
    cumulative_volume_percentage = [sum(total_value_percentage[:i+1]) for i in range(len(total_value_percentage))]
    
    # Table 3 Calculations
    fragments = list(range(1, len(unit_cost) + 1))
    sorted_fragments = [fragments[i] for i in sequence]
    volume_percentage = [total_value_percentage[i] for i in sequence]
    
    # Table 4 Calculations
    abc_groups = []
    group_a = group_b = group_c = []
    cum_sum = 0
    for i, perc in enumerate(cumulative_volume_percentage):
        cum_sum += perc
        if cum_sum <= 70:
            group_a.append(sorted_fragments[i])
        elif 70 < cum_sum <= 90:
            group_b.append(sorted_fragments[i])
        else:
            group_c.append(sorted_fragments[i])
    abc_groups = [{'Group': 'A', 'Parts': group_a, 'Total Value %': sum(volume_percentage[:len(group_a)])},
                  {'Group': 'B', 'Parts': group_b, 'Total Value %': sum(volume_percentage[len(group_a):len(group_a) + len(group_b)])},
                  {'Group': 'C', 'Parts': group_c, 'Total Value %': sum(volume_percentage[len(group_a) + len(group_b):])}]
    
    response = {
        'table2': {
            'total_values': total_values,
            'total_value_percentage': total_value_percentage,
            'sequence': sequence,
            'cumulative_volume_percentage': cumulative_volume_percentage
        },
        'table3': {
            'fragments': sorted_fragments,
            'volume_percentage': volume_percentage
        },
        'table4': abc_groups
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
