<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category', '');
        $search = $request->get('search', '');

        $products = Product::with(['category', 'images'])
            ->when($category !== '', function ($query) use ($category) {
                $query->where('category_id', $category);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                });
            })
            ->paginate(6)->withQueryString();

        $categories = Category::select(['id', 'name'])->orderBy('name')->get()->toArray();

        return Inertia::render('Welcome', [
            'products' => $products,
            'categories' => $categories,
            'category' => $category,
            'search' => $search,
        ]);
    }
}
